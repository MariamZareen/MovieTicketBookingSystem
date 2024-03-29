const express=require('express')
const app=express();
const cors=require('cors')
const bodyParser=require('body-parser')
const {loginTable,movieTable , theatreTable,bookedData} =require('./mongo')


// app.use(cors(
//     {origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']}
// ))
app.use(cors());
//app.use(cors({ origin: 'https://movie-ticket-booking-system-frontend.vercel.app' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  try {
    const movies = await movieTable.find({}).sort({ _id: -1 });
    res.json(movies);
  } catch (error) {
    console.error("Error getting the movie table data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/details/:id',async(req,res)=>{
    try{
      const {id}=req.params;
      const movie=await movieTable.findById(id).sort({ "created_at": -1 });
      //console.log("movie found in database")
      return res.json(movie)
    }
    catch{
        console.log("couldnot get data")
    }
})

app.get('/genre/:genreName', async (req, res) => {
    try {
      const { genreName } = req.params;
      const movies = await movieTable.find({ genre: { $in: [genreName] } }).sort({ createdAt: -1 });
      if (movies.length === 0) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      return res.json(movies);
    } catch (error) {
      console.error("Could not get data:", error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.get('/theatres/:id',async(req,res)=>{
    try{
     // const movieId = req.params.id;
      const { movieName, date } = req.query;
    // console.log("this is the message",movieName," ",date)
      const theatres=await theatreTable.find({"movie name": movieName, "date": date});
      res.json(theatres)
    }
    catch{
      console.log("could not get theatre list")
    }
  })
  
  app.get('/dummy/:id',async (req,res)=>{
    try{
      const id=req.params.id;
      const {email,movieName,date,day,theatreName,theatreLocation,slot,noOfSeats,price}=req.query;
      res.json({email,movieName,date,day,theatreName,theatreLocation,slot,noOfSeats,price})
    }
    catch{
      console.log("couldnot get dummy data")
    }
  })

  app.post('/reservationdata', async (req, res) => {
    try {
      const user = new bookedData({
        email:req.body.email,
        movieName: req.body.movieName,
        date: req.body.date,
        day: req.body.day,
        slot: req.body.slot,
        theatreName: req.body.theatreName,
        theatreLocation: req.body.theatreLocation,
        noOfSeats: req.body.selectedSeats,
        price: req.body.totalCost,
      });
      await user.save();
      const date=req.body.date.substring(5,6)
     
      //console.log(req.body.date.substring(5,6),"this is body date")
      const theater = await theatreTable.findOneAndUpdate(
        {
          "theatre name": req.body.theatreName,
          "location": req.body.theatreLocation,
          "movie name": req.body.movieName,
          "date": date,
          [`slot.${req.body.slot}`]: { $exists: true } // Check if the key exists in the 'slots' object
        },
        {
          $inc: {
            [`slot.${req.body.slot}`]: -req.body.noOfSeats,
          },
        },
        { new: true } // Return the modified document
      );
      
      //console.log('Theater data updated:', theater);
      console.log('Booking data added successfully');
      res.status(200).json("Data saved to the database via POST");
    } catch (error) {
      console.error("Error saving data to the table via POST:", error);
      res.status(500).json("Cannot add data to the table via POST");
    }
  });
  


  app.post('/login', async (req, res) => {
    try {
        // Check if the user with the provided email already exists
        const existingUser = await loginTable.findOne({ email: req.body.email });

        if (existingUser) {
            // User exists, now check the password
            if (req.body.password === existingUser.password) {
                // Password is correct, login successful
                console.log("Login successful");
                res.status(200).json("User Authenticated");
            } else {
                // Password is incorrect
                console.log("Incorrect password");
                res.status(401).json("Incorrect password");
            }
        } else {
            // User does not exist
            console.log("User with this email not found");
            res.status(404).json("User not found in database, please signup");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json("Error during login");
    }
});


app.post('/signup', async (req, res) => {
  try {
      // Check if the user with the provided email already exists
      const existingUser = await loginTable.findOne({ email: req.body.email });

      if (existingUser) {
          // User already exists, return an error message
          console.log("User with this email already exists");
          return res.status(400).json("User with this email already exists");
      }

      // User does not exist, proceed to create a new user
      const user = new loginTable({
          email: req.body.email,
          password: req.body.password
      });

      await user.save();
      console.log("Signup data added successfully");
      res.status(200).json("Data saved to the database via POST");
  } catch (error) {
      console.error("Error saving data to the table via POST:", error);
      res.status(500).json("Cannot add data to the table via POST");
  }
});



app.get('/myprofile/:id', async (req, res) => {
  try {
    const email = req.params.id;
    const data = await bookedData.find({ email });
    res.json(data);
  } catch (error) {
    console.error("Could not get myprofile data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log('server running on port',PORT)
})
