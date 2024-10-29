const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../../models/User');



//register
const registerUser = async(req, res)=>{
    const {userName, email, password }=req.body;

    try{
        const checkUser= await User.findOne({email});
        if(checkUser) return res.json({sucess:false,message:'User Already Exit ! . Please Try Again With Another Email Id'})
        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        })

        await newUser.save()
        res.status(200).json({
            success:true,
            message:"Registration Succesful",
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"some error occured",
        });
    }
};








//login
const loginUser=async(req,res)=>{
    const { email, password }=req.body;

    try{
        const checkUser= await User.findOne({email});
        if(!checkUser) return res.json({
            sucess : false,
            message : "User doesn't exists ! Please Register First"
        })

        const checkPasswordMatch = await bcrypt.compare(password,checkUser.password);
        if(!checkPasswordMatch) return res.json({
            sucess : false,
            message : "Invalid Password ! Try Again.."
        })

        const token=jwt.sign({
            id:checkUser.id,role:checkUser.role,email:checkUser.email
        },'CLIENT_SECRET_KEY',{expiresIn: '120m'})
        

    res.cookie('token',token,{httpOnly:true,secure:false}).json({
        success:true,
        message:'Logged in succesfully',
        user:{
            email:checkUser.email,
            role:checkUser.role,
            id:checkUser.id,
        }
    })




    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"some error occured",
        });
    }
}





//logout

const logoutUser=(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message:'Logged Out Successfully !! '
    });
};




//auth middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token; // Fixed the typo and assignment
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized user!',
        })
    }
    try{
        const decoded=jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user=decoded;
        next();
        }catch(error){
            res.status(401).json({
                success: false,
                message: 'Unauthorized user!',
            });
        }

    };


module.exports={registerUser,loginUser,logoutUser,authMiddleware};