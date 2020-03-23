const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const model = require('../model/model');
const { v4: uuidv4 } = require('uuid');
const db = Mongoose.connection;
const randomLocation = require('random-location');
const randomDate = require('random-date-generator');
const Chance = require('chance');
const fs = require('fs');
const chance = new Chance();
dotenv.config();
let documentCount = 0; 
const lotName = ['Cottage Cheese', 'Swenson', 'Green Lot', 'Blue Lot', 'Thomas and Cheese', 'Jefferson and Mac', 'The Library', 'University Gateway'];

function createCompanies() {
    const company1 = new model.Company({
        companyid: '8e9fe90e-bd10-48d2-8084-8f259157c832',
        companyName: 'MGM',
        lotids: [1, 2, 3, 4, 5],
      });
      const company2 = new model.Company({
        companyid: '04d9c007-f341-413d-ab0f-ae1834c14a19',
        companyName: 'Flamingo',
        lotids: [6, 7],
      });
      const company3 = new model.Company({
        companyid: 'b20228c1-0c64-4a89-9e7b-612a439e3dd5',
        companyName: 'Sapphire',
        lotids: [8],
      });
      company1.save().then(res => {
        documentCount++;
        console.log(`company ${company1.companyName} saved`);
        for(let i = 0; i < company1.lotids.length; i++)
            createLot(company1.lotids[i], company1.companyid, company1.companyName);
            createStaff(company1.companyid, company1.companyName, false);
            createStaff(company1.companyid, company1.companyName, true);
      }).catch(err => {
        console.log(err);
      });
      company2.save().then(res => {
        documentCount++;
        console.log(`company ${company2.companyName} saved`);
        for(let i = 0; i < company2.lotids.length; i++)
            createLot(company2.lotids[i], company2.companyid, company2.companyName);
            createStaff(company2.companyid, company2.companyName, false);
            createStaff(company2.companyid, company2.companyName, true);
      }).catch(err => {
        console.log(err);
      });
      company3.save().then(res => {
        documentCount++;
        console.log(`company ${company3.companyName} saved`);
        for(let i = 0; i < company3.lotids.length; i++)
            createLot(company3.lotids[i], company3.companyid, company3.companyName);
            createStaff(company3.companyid, company3.companyName, false);
            createStaff(company3.companyid, company3.companyName, true);
      }).catch(err => {
        console.log(err);
      })
}

function createLot(lotid, companyid, name){
    const parkingSpots = generateSpots();
    const lot = new model.Lot({
        companyid: companyid,
        lotid: lotid,
        lotName: lotName[lotid-1],
        spots: parkingSpots,
        totalSpots: parkingSpots.length,
        availableSpots: parkingSpots.length,
        location: generateLocation(),
    });
    lot.CreateTimeSlots();
    lot.save().then(res => {
        documentCount++;
        console.log(`lot ${lotid} for company: ${name} saved`);
        createRevenue(lotid, companyid, name);
        createPeakTimes(lotid, companyid, name);
      }).catch(err => {
        console.log(err);
      });
}

function createRevenue(lotid, companyid, name){
    const priceInPennies = 2000;
    const startDate = new Date('2019-01-01');
    const endDate = new Date('2020-01-01');
    for(let i = 0; i < 100; i++){
        const revenue = new model.Revenue({
            companyid: companyid,
            lotid: lotid,
            amount: Math.floor(Math.random() * priceInPennies) + 1,
            date: randomDate.getRandomDateInRange(startDate, endDate),
        });
        revenue.save().then(res => {
            documentCount++;
        }).catch(err => {
            console.log(err);
        });
    }
    console.log(`revenue for lot: ${lotid} at company: ${name} saved`);
}

function createPeakTimes(lotid, companyid, name){
    let incrementalDate = new Date('2019-12-01');
    for(let i = 0; i < 30; i++){
        const peakTimes = new model.ParkingTimes({
            companyid: companyid,
            lotid: lotid,
            peakTimes: generatePeakTimes(),
            date: incrementalDate.setDate(incrementalDate.getDate() + 1),
        });
        peakTimes.save().then(res => {
            documentCount++;
        }).catch(err => {
            console.log(err);
        });
    }
    console.log(`peakTimes for lot: ${lotid} at company: ${name} saved`);
}

function generatePeakTimes(){
    peakTimes = [];
    for(let i = 0; i < 24; i++){
        peakTimes.push({hour: i, count: Math.floor(Math.random() * 100)})
    }
    return peakTimes;
}

function generateSpots(){
    const spotCount = 100;
    const spots = [];
    const level = ['A', 'B', 'C', 'D', 'E'];
    for(let i = 0; i < spotCount; i++){
        spots.push({
            spotid: `${level[i % level.length]}${i & 20}`,
            active: true,
        });
    }
    return spots;
}

function generateLocation(){
    const LasVegas = {
        latitude: 36.114647,
        longitude: -115.172813,
    }
    const radius = 10500;
    return randomLocation.randomCirclePoint(LasVegas, radius);
}

function createCustomers(){
    for(let i = 1; i <= 10; i++){
        const username = `customer${i}`;
        const firstName = chance.first();
        const lastName = chance.last();
        const user = new model.User({
            username: username, 
            role: 'customer',
            first: firstName,
            last: lastName,
        });
        user.password = user.GenerateHash('password');
        user.save().then(res => {
            console.log(`customer ${user.first} ${user.last} saved to users`);
            documentCount++;
            const customer = new model.Customer({
                username: username,
                first: firstName,
                last: lastName,
                car: [{
                    color: chance.pickone(['blue', 'green', 'purple', 'black', 'gray']),
                    license: chance.word(),
                    make: 'Toyota',
                    model: 'Zamboni',
                }],  
            });
            customer.save().then(res => {
                console.log(`customer ${customer.first} ${customer.last} saved to customers`);
                documentCount++;
              }).catch(err => {
                console.log(err);
              });
          }).catch(err => {
            console.log(err);
          });
    }
}

function createStaff(companyid, companyName, admin){
    const role = admin ? 'admin' : 'staff'
    const firstName = chance.first();
    const lastName = chance.last();
    const user = new model.User({
        username: `${role}${companyName}`, 
        role: role,
        first: firstName,
        last: lastName,
        companyid: companyid,
    });
    user.password = user.GenerateHash('password');
    user.save().then(res => {
        console.log(`${role} ${user.first} ${user.last} saved to users`);
        documentCount++;
        const staff = new model.Staff({
            username: `${role}${companyName}`,
            first: firstName,
            last: lastName,
            employeeid: chance.string({ length: 5, casing: 'upper', alpha: true, numeric: true }),
            companyid: companyid,
            admin: admin,
        });
        staff.save().then(res => {
            console.log(`${role} ${staff.first} ${staff.last} for company: ${companyName} saved to staffs`);
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
    createCustomers();
    wait();
});

function wait(){
    if (documentCount != 1083){
        setTimeout(wait,100);
    } else {
      console.log('dab on em we inserted data into mongoDB');
      process.exit(0);
    }
}
  