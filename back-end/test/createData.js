const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const model = require('../model/model');
const db = Mongoose.connection;
const subDays = require('date-fns/subDays')
const Chance = require('chance');
const chance = new Chance();
dotenv.config();
let documentCount = 0; 
const id1 = 'f350d2d8-103b-4fa7-92cf-f09d7d06576c';
const id2 = '04d9c007-f341-413d-ab0f-ae1834c14a19';
const id3 = 'b20228c1-0c64-4a89-9e7b-612a439e3dd5';
const id4 = '76912b0d-eb81-4b0a-857c-ad2981446f47';
const id5 = 'c91a1d38-11bd-4cec-b841-9830757b4d04';
const id6 = '8e9fe90e-bd10-48d2-8084-8f259157c832';


function createCompanies() {
    const company1 = new model.Company({
        companyid: id1,
        companyName: 'Park Inn Demo',
        lotids: [1]
      });

      const company2 = new model.Company({
        companyid: id2,
        companyName: 'McCarran Airport',
        lotids: [2],
      });
      const company3 = new model.Company({
        companyid: id3,
        companyName: 'Flamingo',
        lotids: [3],
      });
      const company4 = new model.Company({
        companyid: id4,
        companyName: 'City of Las Vegas',
        lotids: [4],
      });
      const company5 = new model.Company({
        companyid: id5,
        companyName: 'Fashion Show Mall',
        lotids: [5],
      });

      const company6 = new model.Company({
        companyid: id6,
        companyName: 'Town Square',
        lotids: [6],
      });



      company1.save().then(res => {
        documentCount++;
        console.log(`company ${company1.companyName} saved`);
      }).catch(err => {
        console.log(err);
      });

      company2.save().then(res => {
        documentCount++;
        console.log(`company ${company2.companyName} saved`);
      }).catch(err => {
        console.log(err);
      });

      company3.save().then(res => {
        documentCount++;
        console.log(`company ${company3.companyName} saved`);
      }).catch(err => {
        console.log(err);
      })

      company4.save().then(res => {
        documentCount++;
        console.log(`company ${company4.companyName} saved`);
      }).catch(err => {
        console.log(err);
      })

      company5.save().then(res => {
        documentCount++;
        console.log(`company ${company5.companyName} saved`);
      }).catch(err => {
        console.log(err);
      })

      company6.save().then(res => {
        documentCount++;
        console.log(`company ${company6.companyName} saved`);
      }).catch(err => {
        console.log(err);
      })
}

function createLots(){
    const lot1 = new model.Lot({
        companyid: id1,
        lotid: 1,
        lotName: 'Park Inn Lot Demo',
        spots: [],
        location: {
            latitude: 36.1085,
            longitude: -115.1432
        },
        imgURL: 'https://cdn.discordapp.com/attachments/693888277165375512/693922449959550986/image6.png',
        totalSpots: 200,
        availableSpots: 200,
        averageTimeParked: {
            currentAverage: 127,
            totalCount: 4000,
        },
    });

    lot1.save().then(res => {
        documentCount++;
      }).catch(err => {
        console.log(err);
      });

    const lot2 = new model.Lot({
        companyid: id2,
        lotid: 2,
        lotName: 'Terminal 3 Parking Garage',
        spots: [],
        location: {
            latitude: 34.0840,
            longitude: -115.1537
        },
        imgURL: 'https://cdn.discordapp.com/attachments/693888277165375512/707768013599801374/Mccarran_Airport_Garage_Twitter.jpg',
        totalSpots: 432,
        availableSpots: 432,
    });

    lot2.save().then(res => {
        documentCount++;
      }).catch(err => {
        console.log(err);
      });

      const lot3 = new model.Lot({
        companyid: id3,
        lotid: 3,
        lotName: 'Guest Parking',
        spots: [],
        location: {
            latitude: 36.1097,
            longitude: -115.1690
        },
        imgURL: 'https://cdn.discordapp.com/attachments/693888277165375512/707768014984052876/Flamingo_Guest_Parking.jpg',
        totalSpots: 239,
        availableSpots: 239,
    });

    lot3.save().then(res => {
        documentCount++;
      }).catch(err => {
        console.log(err);
      });

      const lot4 = new model.Lot({
        companyid: id4,
        lotid: 4,
        lotName: 'City Hall Garage',
        spots: [],
        location: {
            latitude: 36.1671,
            longitude: -115.1502
        },
        imgURL: 'https://cdn.discordapp.com/attachments/693888277165375512/693922439436173435/image1.png',
        totalSpots: 325,
        availableSpots: 325,
    });

    lot4.save().then(res => {
        documentCount++;
      }).catch(err => {
        console.log(err);
      });

      const lot5 = new model.Lot({
        companyid: id5,
        lotid: 5,
        lotName: 'Fashion Show Mall Parking',
        spots: [],
        location: {
            latitude: 36.1271,
            longitude: -115.1744
        },
        imgURL: 'https://cdn.discordapp.com/attachments/693888277165375512/693922456506859580/image8.png',
        totalSpots: 432,
        availableSpots: 432,
    });

    lot5.save().then(res => {
        documentCount++;
      }).catch(err => {
        console.log(err);
      });

      const lot6 = new model.Lot({
        companyid: id2,
        lotid: 6,
        lotName: 'South Garage',
        spots: [],
        location: {
            latitude: 36.0693,
            longitude: -115.1748
        },
        imgURL: 'https://cdn.discordapp.com/attachments/693888277165375512/707768016213115010/South_Garage.png',
        totalSpots: 156,
        availableSpots: 156,
    });

    lot6.save().then(res => {
        documentCount++;
      }).catch(err => {
        console.log(err);
      });
}

function createRevenue(){
    const priceInPennies = 2000;
    let incrementalDate = new Date('2020-05-07');
    for(let j = 0; j < 360; j++){
        for(let i = 0; i < 50; i++){
            const revenue = new model.Revenue({
                companyid: id1,
                lotid: 1,
                amount: Math.floor(Math.random() * priceInPennies) + 1,
                date: subDays(incrementalDate, j),
            });
            revenue.save().then(res => {
                documentCount++;
                console.log(documentCount);
            }).catch(err => {
                console.log(err);
            });
        }
    }
}

function createPeakTimes(){
    let incrementalDate = new Date('2020-05-07');
    for(let i = 0; i < 90; i++){
        const peakTimes = new model.ParkingTimes({
            companyid: id1,
            lotid: 1,
            peakTimes: generatePeakTimes(),
            date: subDays(incrementalDate, i),
        });
        peakTimes.save().then(res => {
            documentCount++;
        }).catch(err => {
            console.log(err);
        });
    }
}

function generatePeakTimes() {
    let peakTimes = []
    let counts = [50, 42, 30, 15, 4, 0, 0, 10, 16, 75, 150, 235, 358, 435, 545, 630, 425, 475, 725, 620, 512, 430, 320, 150];
    for(let i = 0; i < 24; i++){
        peakTimes.push({
            hour: i,
            count: counts[i],
        })
    }
    return peakTimes;
}

function createCustomer(){
        const user = new model.User({
            username: 'parkinnCustomer@email.com', 
            role: 'customer',
            name: {
                givenName: 'John',
                familyName: 'Doe',
            }
        });
        user.password = user.GenerateHash('password');
        user.save().then(res => {
            console.log(`customer ${user.name.givenName} ${user.name.familyName} saved to users`);
            documentCount++;
            const customer = new model.Customer({
                username: 'parkinnCustomer@email.com', 
                name: {
                    givenName: 'John',
                    familyName: 'Doe',
                },
                car: [{
                    color: 'Blue',
                    license: '412EZL',
                    make: 'Ford',
                    model: 'Focus',
                }],  
            });
            customer.save().then(res => {
                console.log(`customer ${customer.name.givenName} ${customer.name.familyName} saved to customers`);
                documentCount++;
              }).catch(err => {
                console.log(err);
              });
          }).catch(err => {
            console.log(err);
          });
}

function createStaff(){
    const user = new model.User({
        username: `parkinn@email.com`, 
        role: 'staff',
        name: {
            givenName: 'Jane',
            familyName: 'Roe',
        },
        companyid: id1,
    });
    user.password = user.GenerateHash('password');
    user.save().then(res => {
        console.log(`staff ${user.name.givenName} ${user.name.familyName} saved to users`);
        documentCount++;
        const staff = new model.Staff({
            username: `parkinn@email.com`, 
            name: {
                givenName: 'Jane',
                familyName: 'Roe',
            },
            employeeid: 'EM1234',
            companyid: id1,
            companyName: 'Park Inn Demo',
            admin: true,
        });
        staff.save().then(res => {
            console.log(`staff ${staff.name.givenName} ${staff.name.familyName} saved to staffs`);
            documentCount++;
          }).catch(err => {
            console.log(err);
          });
      }).catch(err => {
        console.log(err);
      });
}

Mongoose.connect(
    process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  );
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('dab on em we connected to mongoDB');
    createCompanies();
    createLots();
    createCustomer();
    createStaff();
    createPeakTimes();
    createRevenue();
    wait();
});

function wait(){
    if (documentCount != 18104){
        setTimeout(wait,100);
    } else {
      console.log('dab on em we inserted data into mongoDB');
      process.exit(0);
    }
}
  