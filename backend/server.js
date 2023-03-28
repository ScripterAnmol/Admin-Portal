import express from 'express';
import mysql from 'mysql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { Constants } from './Constants.js';
import cookieParser from 'cookie-parser'
import Cors from 'cors'

const app = express();
app.use(express.json());
app.use(Cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));

app.use(cookieParser());

const db = mysql.createConnection({
    host: Constants.host,
    user: Constants.user,
    password: Constants.password,
    database: Constants.database
});

/*app.post("/register",(req,res)=>{
    const {uName, pswd} = req.body;
    if(uName!=='' && pswd!==''){
        db.query('SELECT uName from users WHERE uName= ?',[uName],async (error,results) => {
            if(error){
                return res.status(400).send({
                    msg: 'Oops! Some Error'
                });
            }

            if(results.length>0){
                return res.status(400).send({
                    msg: 'User Already Present'
                });
            }else{
                let hashedPassword = await bcrypt.hash(pswd,8);
                db.query('INSERT INTO users set ?',{uName: uName,pswd: hashedPassword},(error,result)=>{
                    if(error){
                        return res.status(400).send({
                            msg: 'Oops! Some Error'
                        });
                    }else{
                        db.query('SELECT * from users WHERE uName= ?',[uName],async (error,results) => {
                            if(error){
                                return res.status(400).send({
                                    msg: 'Oops! Some Error'
                                });
                            }
                            const token = jwt.sign({uId: results[0]['uId'], uName: results[0]['uName']},Constants.JWT_SECRET,{expiresIn: '1h'});
                            return res.status(200).send({
                                msg: 'Registration Successful',
                                token
                            });
                        });
                    }
                })
            }
        })
    }else{
        return res.status(400).send({
            msg: 'Please fill both fields'
        });
    }
})*/

app.post("/login",(req,res)=>{
    db.query(`SELECT * FROM users WHERE email='${req.body.email}'`,(err,result)=>{
        if(err){
            return res.status(400).send({
                msg: err
            });
        }else{
            if(!result.length){
                return res.status(400).send({
                    msg: 'Email or Password is incorrect!'
                });
            }

            bcrypt.compare(
                req.body.pswd,result[0]['pswd'],async (bErr,bResult) => {
                    if(bErr){
                        return res.status(400).send({
                            msg: bErr
                        });
                    }
                    if(bResult){
                        const token = jwt.sign({e_id: result[0]['e_id'], e_name: result[0]['e_name']},Constants.JWT_SECRET,{expiresIn: '1h'});
                        return res.status(200).cookie('token',{token},{httpOnly: true}).send({
                            msg: 'Log In Successful',
                            token
                        });
                    }else{
                        // let hashedPassword = await bcrypt.hash("Anmol",8);
                        // console.log(hashedPassword)
                        return res.status(400).send({
                            msg: 'Email or Password is incorrect!',
                        });
                    }
                }
            );
        }
    });
})

app.post("/verifyToken",(req,res)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization;
        jwt.verify(token, Constants.JWT_SECRET, function(err, decoded) {
        if (err){
            return res.status(401).json(false);
        }
        return res.status(200).json(true);
    });
    }else {
        return res.status(403).send(false);
    }
})

app.get("/setCookie",(req,res)=>{
    return res.status(200).cookie('test',"true",{httpOnly: true}).send({
        msg: 'Logged In',
    })
    // return res.status(200).send({"token":"true"});
})


app.use((req,res,next)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization;
        jwt.verify(token, Constants.JWT_SECRET, function(err, decoded) {
        if (err){
            return res.status(401).json(false);
        }
        req.decoded = decoded;
        next();
    });
    }else {
        return res.status(403).send(false);
    }
})

app.post("/createbooking",(req,res)=>{
    db.query(`INSERT INTO bookings(c_email,location_id,drone_shot_id,creation_timestamp) values('${req.body.cemail}','${req.body.locationId}','${req.body.dShotId}','${req.body.creationTimestamp}')`,(error,result,fields)=>{
        if(error) throw error;
        // console.log(result)
        return res.status(200).send({msg : `Booking ID: ${result.insertId} has been Created Successfully`})
    })
})
app.post("/createcustomer",(req,res)=>{
    db.query(`INSERT INTO customers(email,ph_no) values('${req.body.cemail}','${req.body.cphno}')`,(error,result,fields)=>{
        if(error) throw error;
        // console.log(result)
        return res.status(200).send({msg : `Booking ID: ${result.insertId} has been Created Successfully`})
    })
})
app.post("/bookings",async (req,res)=>{
    await db.query('SELECT count(*) FROM bookings',async (error,result)=>{
        if(error) return res.status(400).send({error});
        
        let Pages=Math.ceil(result[0]["count(*)"]/5);
        let has_next=(req.body.cur_num<Pages)?true:false
        console.log(result[0]["count(*)"])
        console.log(has_next+" "+Pages+" "+req.body.cur_num)        
        let next_num=has_next?req.body.cur_num+1:Pages
        let has_prev=(req.body.cur_num>1)?true:false
        let prev_num=has_prev?req.body.cur_num-1:0;
        
        let start=(req.body.cur_num-1)*5
        await db.query(`SELECT * FROM bookings order by creation_timestamp desc limit ${start},5`,(error,result)=>{
            if(error) res.status(400).send({error});

            let resl = {}
            resl.has_next=has_next
            resl.next_num=next_num
            resl.has_prev=has_prev
            resl.prev_num=prev_num
            resl.cur_num=req.body.cur_num
            resl.results = []
            for(let i=0;i<result.length;i++){
                let d= new Date(result[i].creation_timestamp);
                // let submissionDate=response.data.CreatedDate?(d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear()):"-";
                result[i].creation_timestamp=d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear()
                resl.results.push(result[i]);
            }
            // console.log(resl)
            return res.status(200).send(resl)
        })

        // return res.status(200).send(result)
    })
})

app.post("/filterbookings",async (req,res)=>{
    await db.query(`SELECT count(*) FROM bookings where c_email like '%${req.body.email}%'`,async (error,result)=>{
        // console.log("remail",req.body.email)

        if(error) return res.status(400).send({error});
        // console.log(error)
        let Pages=Math.ceil(result[0]["count(*)"]/5);
        let has_next=(req.body.cur_num<Pages)?true:false
        // console.log(result[0]["count(*)"])
        // console.log(has_next+" "+Pages+" "+req.body.cur_num)        
        let next_num=has_next?req.body.cur_num+1:Pages
        let has_prev=(req.body.cur_num>1)?true:false
        let prev_num=has_prev?req.body.cur_num-1:0;
        
        // console.log("remail",req.body.email)
        let start=(req.body.cur_num-1)*5
        await db.query(`SELECT * FROM bookings where c_email like '%${req.body.email}%' order by creation_timestamp desc limit ${start},5`,(error,result)=>{
            if(error) res.status(400).send({error});
            
            // console.log(error)
            let resl = {}
            resl.has_next=has_next
            resl.next_num=next_num
            resl.has_prev=has_prev
            resl.prev_num=prev_num
            resl.cur_num=req.body.cur_num
            resl.results = []
            for(let i=0;i<result.length;i++){
                let d= new Date(result[i].creation_timestamp);
                result[i].creation_timestamp=d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear()
                resl.results.push(result[i]);
            }
            // console.log(resl)
            return res.status(200).send(resl)
        })

            // return res.status(200).send(result)
    })
})
app.post("/deletebooking",async (req,res)=>{
    await db.query(`Delete from bookings where booking_id=${req.body.booking_id}`,async (error,result)=>{
        if(error) res.status(400).send({error});

        return res.status(200).send("Deleted Successfully")
    })
})


// ********************************************

app.post("/customers",async (req,res)=>{
    await db.query('SELECT count(*) FROM customers',async (error,result)=>{
        if(error) return res.status(400).send({error});
        
        let Pages=Math.ceil(result[0]["count(*)"]/5);
        let has_next=(req.body.cur_num<Pages)?true:false
        console.log(result[0]["count(*)"])
        console.log(has_next+" "+Pages+" "+req.body.cur_num)        
        let next_num=has_next?req.body.cur_num+1:Pages
        let has_prev=(req.body.cur_num>1)?true:false
        let prev_num=has_prev?req.body.cur_num-1:0;
        
        let start=(req.body.cur_num-1)*5
        await db.query(`SELECT * FROM customers order by email desc limit ${start},5`,(error,result)=>{
            if(error) res.status(400).send({error});

            let resl = {}
            resl.has_next=has_next
            resl.next_num=next_num
            resl.has_prev=has_prev
            resl.prev_num=prev_num
            resl.cur_num=req.body.cur_num
            resl.results = []
            for(let i=0;i<result.length;i++){
                resl.results.push(result[i]);
            }
            // console.log(resl)
            return res.status(200).send(resl)
        })

        // return res.status(200).send(result)
    })
})

app.post("/filtercustomers",async (req,res)=>{
    await db.query(`SELECT count(*) FROM customers where email like '%${req.body.email}%'`,async (error,result)=>{
        // console.log("remail",req.body.email)

        if(error) return res.status(400).send({error});
        // console.log(error)
        let Pages=Math.ceil(result[0]["count(*)"]/5);
        let has_next=(req.body.cur_num<Pages)?true:false
        // console.log(result[0]["count(*)"])
        // console.log(has_next+" "+Pages+" "+req.body.cur_num)        
        let next_num=has_next?req.body.cur_num+1:Pages
        let has_prev=(req.body.cur_num>1)?true:false
        let prev_num=has_prev?req.body.cur_num-1:0;
        
        // console.log("remail",req.body.email)
        let start=(req.body.cur_num-1)*5
        await db.query(`SELECT * FROM customers where email like '%${req.body.email}%' order by email desc limit ${start},5`,(error,result)=>{
            if(error) return res.status(400).send({error});
            
            // console.log(error)
            let resl = {}
            resl.has_next=has_next
            resl.next_num=next_num
            resl.has_prev=has_prev
            resl.prev_num=prev_num
            resl.cur_num=req.body.cur_num
            resl.results = []
            // console.log(result)
            for(let i=0;i<result.length;i++){
                resl.results.push(result[i]);
            }
            // console.log(resl)
            return res.status(200).send(resl)
        })

            // return res.status(200).send(result)
    })
})

app.post("/deletecustomer",async (req,res)=>{
    await db.query(`Delete from customers where c_id=${req.body.c_id}`,async (error,result)=>{
        if(error) return res.status(400).send({error});

        return res.status(200).send("Deleted Successfully")
    })
})

// *********************************************





app.post("/addItem",(req,res)=>{
    db.query(`INSERT INTO list_data(uId,title) values('${req.decoded.uId}','${req.body.title}')`,(error,result,fields)=>{
        if(error) throw error;
        return res.status(200).send({msg : "Successful"})
    })
})

app.post("/removeItem/:id",(req,res)=>{
    db.query(`DELETE FROM list_data where id=${req.params.id} and ${req.decoded.uId}`,(error,result,fields)=>{
        if(error) throw error;
        return res.status(200).send({msg: "Successful"})
    })
})

app.get("/getItems",(req,res)=>{
    db.query('SELECT id,title FROM list_data where uId=? order by id',req.decoded.uId,(error,result)=>{
        if(error) res.status(400).send({error});
        return res.status(200).send(result)
    })
})


app.listen(8000,()=>{
    console.log("Server started on Port 8000");
})