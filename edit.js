var express = require('express')
var mysql2 = require('mysql2')
var app = express()
var bopa = require('body-parser');
app.set("view engine", "ejs");

let port = 5547

app.use(bopa.urlencoded({ extended: false }))
var conn = mysql2.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'candidate'
})

conn.connect((err) => {
    if (err) throw err
    console.log('connected!')
})



app.get('/', (req, res) => {
    var x = []
    var y = []
    var z = []
    var query = 'select ovalue from option_master where fkid=1'
    conn.query(query, (err, data) => {
        if (err) throw err
        x = data
    })


    conn.query('select ovalue from option_master where fkid=2', (err, data) => {
        if (err) throw err
        y = data

    })

    conn.query('select ovalue from option_master where fkid=3', (err, data) => {
        if (err) throw err
        z = data
    })

    conn.query('select ovalue from option_master where fkid=4', (err, data) => {
        if (err) throw err
        f = data
    })

    conn.query('select ovalue from option_master where fkid=5', (err, data) => {
        if (err) throw err
        k = data
    })
    conn.query('select ovalue from option_master where fkid=6', (err, data) => {
        if (err) throw err
        g = data
    })

    conn.query('select id,state_name from state_master', (err, data) => {
        if (err) throw err
        g1 = data
    })

    var a = []
    conn.query('select * from basic_info where did=0', (err, data) => {
        if (err) throw err
        a = data
        res.render('shaweditdata', { a, x, y, f, k, g, g1, z })
    })
})


app.get('/remove', (req, res) => {
    var d_id = req.query.id;
    // console.log(d_id)
    conn.query(`update  basic_info set did=1 where id = ${d_id}`, (err, data) => {
        if (err) throw err
        console.log('data deleted successfully!')
        res.json(data);
    })
})


app.get('/multidelete', (req, res) => {
    var did = req.query.id;
    // console.log(did)
    conn.query(`update basic_info set did=1 where id IN (${did})`, (err, data) => {
        if (err) throw err
        console.log('data deleted successfully!')
        res.json(data);
    })
})


app.get('/cities', (req, res) => {
    var id = req.query.id;
    // console.log(id)
    conn.query(`select city_names from city_name where c_pk ='${id}'`, (err, result) => {
        if (err) throw err;
        res.send(result);
        // console.log(result)
    })
})




app.get('/pagination', (req, res) => {
    var ajax = req.query.ajax || false;
    var h = req.query.id;
    // console.log(h)
    var x = (h - 1) * 5 || 0


    conn.query('select * from basic_info where did=0', (err, data1) => {
        if (err) throw err

        conn.query(`select * from basic_info where did=0 limit ${x},5`, (err, data) => {
            if (err)
                console.log(err);
            if (!ajax) {
                console.log(data1.length)
                res.render('edit', { data, count_record: data1.length });
            }
            else {
                res.json(data);
            }
        });
    })
})




app.get('/shaweditdata1', (req, res) => {
    let bid = req.query.id;
    console.log(bid)
    console.log('data is moving')
    conn.query('select state_name from state_master', (err, data) => {
        if (err) throw err;
        s1 = data

        conn.query('select city_names from city_name', (err, data) => {
            if (err) throw err;
            c1 = data

            conn.query('select ovalue from option_master where fkid=2', (err, data) => {
                if (err) throw err;
                r1 = data

                conn.query('select ovalue from option_master where fkid=4', (err, data) => {
                    if (err) throw err;
                    r2 = data

                    conn.query(`select * from academics where id = ${bid}`, (err, data) => {
                        if (err) throw err;
                        r3 = data
                        // console.log(r3)

                        conn.query(`select * from experience where id = ${bid}`, (err, data) => {
                            if (err) throw err;
                            r4 = data
                            // console.log(r4)

                            conn.query('select ovalue from option_master where fkid=5', (err, data) => {
                                if (err) throw err;
                                r5 = data
                                // console.log("r5 data",r5)

                                conn.query(`select * from language where id=${bid}`, (err, data) => {
                                    if (err) throw err;
                                    r6 = data
                                    // console.log('r6dsh',r6)

                                    conn.query('select ovalue from option_master where fkid=6', (err, data) => {
                                        if (err) throw err;
                                        r7 = data

                                        conn.query(`select * from technologies where id=${bid}`, (err, data) => {
                                            if (err) throw err;
                                            r8 = data

                                            conn.query(`select * from preferences where id=${bid}`, (err, data) => {
                                                if (err) throw err;
                                                r9 = data


                                                conn.query('select ovalue from option_master where fkid=3', (err, data) => {
                                                    if (err) throw err;
                                                    r10 = data

                                                    conn.query(`select * from reference `, (err, data) => {
                                                        if (err) throw err;
                                                        r11 = data

                                                        // conn.query(`select lang_action from language where id=${bid} `, (err, data) => {
                                                        //     if (err) throw err;
                                                        //     r12 = data




                                                        conn.query(`select * from basic_info where id=${bid} and did=0`, (err, data) => {
                                                            if (err) throw err;
                                                            // console.log(data);
                                                            // console.log(r3)
                                                            // console.log(r2)
                                                            // console.log(r4)
                                                            // console.log(r5)
                                                            // console.log(r7)
                                                            // console.log(r6)
                                                            // console.log(r8)
                                                            // console.log(r10)
                                                            // console.log(r9)
                                                            res.render('shaweditdata1', { data: data, bid, s1, c1, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11 })
                                                        })
                                                    })
                                                })
                                                // })
                                            })
                                        })
                                    })
                                })
                                // })
                            })
                        })
                    })
                })
            })
        })
    })
})
//  <!-- <span id="<%=data[i].id%>" onclick="edit(this)">Edit</span> -->



app.post('/edit1', (req, res) => {
    var fn = req.body.fname;
    var ln = req.body.lname;
    var e = req.body.email;
    var a1 = req.body.add1;
    var a2 = req.body.add2;
    var desig = req.body.designation;
    var z = req.body.zip;
    var mn = req.body.mno;
    var c = req.body.city;
    var dob = req.body.dob;
    var g = req.body.gender;
    var rs = req.body.relationship;
    var st = req.body.state;
    var fk;
    console.log()
    //basic_details
    conn.query(`insert into basic_info (f_name,l_name,email,add1,add2,designation,zipcode,mobileno,city,dob,gender,relationship_status,state) values('${fn}','${ln}','${e}','${a1}','${a2}','${desig}','${z}','${mn}','${c}','${dob}','${g}','${rs}','${st}')`, (err, result) => {
        if (err) throw err
        fk = result.insertId;
        console.log(fk);
        console.log('basic-details Done!!')


        //    education-details

        var cname = req.body.course;
        var passyear = req.body.passyear;
        var per = req.body.percentage;
        var uni = req.body.university;


        if (typeof cname == 'object') {
            for (var i = 0; i < cname.length; i++) {
                conn.query(`insert into academics(id,course_name,percentage,passingyear,university) values('${fk}','${cname[i]}','${per[i]}','${passyear[i]}','${uni[i]}')`, (err, res) => {
                    if (err) throw err
                    console.log('education done')
                })

            }
        }

        else {
            conn.query(`insert into academics(id,course_name,percentage,passingyear,university) values('${fk}','${cname}','${per}','${passyear}','${uni}')`, (err, res) => {
                if (err) throw err
                console.log('education done')
            })
        }



        // work-Exeperience   

        var companyname = req.body.companyname;
        var position = req.body.position;
        var sdate = req.body.sdate;
        var edate = req.body.edate;

        if (typeof companyname == 'object') {
            for (var j = 0; j < companyname.length; j++) {
                conn.query(`insert into experience(id,company_name,position,joining_date,leaving_date) values('${fk}','${companyname[j]}','${position[j]}','${sdate[j]}','${edate[j]}')`, (err, res) => {
                    if (err) throw err
                    console.log('work-exe done');
                })
                //  console.log(companyname[i],position[i],sdate[i],edate[i]);
            }
        }
        else {
            conn.query(`insert into experience(id,company_name,position,joining_date,leaving_date) values('${fk}','${companyname}','${position}','${sdate}','${edate}')`, (err, res) => {
                if (err) throw err
                console.log('work-exe done')
            })
            // console.log(companyname,position,sdate,edate);

        }


        //   language known
        var lang = req.body.languages;
        // console.log(lang);
        for (var k = 0; k < lang.length; k++) {
            conn.query(`insert into language(id,language_name,lang_action) values(${fk},'${lang[k]}','${req.body[lang[k]]}')`, (err, res) => {
                if (err) throw err
                console.log('lang done!')
                // console.log(lang[k])
            })

        }



        // Technologies
        var tech = req.body.technologies
        for (i = 0; i < tech.length; i++) {
            conn.query(`insert into technologies(id,level,language_names) values('${fk}','${req.body[tech[i]]}','${tech[i]}')`, (err, res) => {
                if (err) throw err
                console.log('tech done!')
            })
        }




        // -------------------------------------------------------------------------------------------------

        //Preferances
        var pref = req.body.pl
        var cc = req.body.cc
        var ec = req.body.ec
        var np = req.body.np
        var dept = req.body.dpt

        conn.query(`insert into preferences(id,curr_ctc,exp_ctc,pref_loc,notice_period,dept) values('${fk}','${cc}','${ec}','${pref}','${np}','${dept}')`, (err, res) => {
            if (err) throw err
            console.log('pref done!')

        })



        // -------------------------------------------------------------------------------------------------
        // references

        var name = req.body.rname1
        var contact = req.body.cno1
        var relation = req.body.rl1

        conn.query(`insert into reference(id,rl_name,rl_contact,rl_relation) values('${fk}','${name}','${contact}','${relation}')`, (err, res) => {
            if (err) throw err
            // console.log(res)
            console.log('ref done!')

        })
    })
    res.redirect('/pagination')
})



app.post('/shawedit1', (req, res) => {
    let id = req.body.id;
    var fn = req.body.f_name;
    var ln = req.body.l_name;
    var e = req.body.email;
    var a1 = req.body.add1;
    var a2 = req.body.add2;
    var desig = req.body.designation;
    var z = req.body.zip;
    var mn = req.body.mno;
    var c = req.body.city;
    var dob = req.body.dob;
    var g = req.body.gender;
    var rs = req.body.relationship;
    var st = req.body.state;
 
    console.log('Edit Begins')

    //Basic_details
    conn.query(`update basic_info set f_name='${fn}',l_name='${ln}',email='${e}',add1='${a1}',add2='${a2}',designation='${desig}',zipcode='${z}',mobileno='${mn}',city='${c}',dob='${dob}',gender='${g}',relationship_status='${rs}',state='${st}' where id=${id}`, (err, result) => {
        if (err) throw err
        console.log('basic-details Done!!')

        //    Education-details
        var cname = req.body.course;
        var passyear = req.body.passyear;
        var per = req.body.percentage;
        var uni = req.body.university;

        conn.query(`delete from academics where id=${id}`, (err, res) => {
            if (err) throw err
            console.log(`academics data deleted of id ${id}`)
        })
        if (typeof cname == 'object') {
            for (var i = 0; i < cname.length; i++) {
                conn.query(`insert into academics(id,course_name,percentage,passingyear,university) values(${id},'${cname[i]}','${per[i]}','${passyear[i]}','${uni[i]}')`, (err, res) => {
                    if (err) throw err
                    console.log('education done')
                })
            }
        }

        else {
            conn.query(` insert into academics(id,course_name,percentage,passingyear,university) values(${id},'${cname}','${per}','${passyear}','${uni}')`, (err, res) => {
                if (err) throw err
                console.log('education done')
            })

        }



        // work-Exeperience   
        var companyname = req.body.companyname;
        var position = req.body.position;
        var sdate = req.body.sdate;
        var edate = req.body.edate;

        // console.log(typeof companyname)
        conn.query(`delete  from experience where id=${id}`, (err, res) => {
            if (err) throw err;
            console.log(`experience data deleted of id ${id}`)
        })
        if (typeof companyname == 'object') {
            for (var j = 0; j < companyname.length; j++) {
                conn.query(`insert into experience(id,company_name,position,joining_date,leaving_date) values(${id},'${companyname[j]}','${position[j]}','${sdate[j]}','${edate[j]}')`, (err, res) => {
                    if (err) throw err
                    console.log('work-exe done');
                })
            }
        }
        else {
            conn.query(`insert into experience(id,company_name,position,joining_date,leaving_date) values(${id},'${companyname}','${position}','${sdate}','${edate}')`, (err, res) => {
                if (err) throw err
                console.log('work-exe done')
            })
        }



        //   LANGUAGE UPDATE
        var lang = req.body.languages;

        conn.query(`delete from language where id=${id}`, (err, res) => {
            if(err) throw err
                console.log(`languages data deleted of id ${id}`)
        })
        for (var k = 0; k < lang.length; k++) {
            console.log('delted id of language',id)
            conn.query(`insert into language(id,language_name,lang_action) values(${id},'${lang[k]}','${req.body[lang[k]]}')`, (err, res) => {
                console.log('ddgwedge',req.body[lang[k]])
                if (err) throw err
                console.log('lang done!')
                // console.log(lang[k])
            })
        }


        // Technologies
        var tech = req.body.technologies
        conn.query(`delete from technologies where id=${id}`, (err, res) => {
            if (err) throw err
                console.log(`technologies data deleted of id ${id}`)
        })
        for (i = 0; i < tech.length; i++) {
            conn.query(`insert into technologies(id,level,language_names) values(${id},'${req.body[tech[i]]}','${tech[i]}')`, (err, res) => {
                if (err) throw err
                console.log('tech done!')
            })
        }


        //Preferances
        var pref = req.body.pl
        var cc = req.body.cc
        var ec = req.body.ec
        var np = req.body.np
        var dept = req.body.dpt

        conn.query(`update preferences set curr_ctc='${cc}',exp_ctc='${ec}',pref_loc='${pref}',notice_period='${np}',dept='${dept}' where id=${id} `, (err, res) => {
            if (err) throw err
            console.log('pref done!')
        })


        // references
        var name = req.body.rname1
        var contact = req.body.cno1
        var relation = req.body.rl1

        conn.query(`update reference
         set rl_name='${name}',rl_contact='${contact}',rl_relation='${relation}'
          where id=${id}`, (err, res) => {
            if (err) throw err
            console.log('ref done!')
        })
    })
    res.render('hello');
})

app.listen(port, () => {
    console.log(`port ${port} is running!`)
})










