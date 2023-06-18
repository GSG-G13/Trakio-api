import request from 'supertest'
import dotenv from 'dotenv'
import app from '../src/app'
import buildDatabase from '../src/database/config/build'
import connection from '../src/database/config'
import { log } from 'console';

dotenv.config()

beforeEach(() => buildDatabase().then(()=> log("Build Successfully")).catch(()=>log("Error Build")))

describe('Test the /signup route', () => {
    test('Should return 201 status with a json of user info', (done) => {
        request(app)
        .post('/signup')
        .send({ name: 'admin', email: 'admin@gmail.com', password: '12345678', phone: '0599999999'})
        .expect(201)
        .end((err, res) => {   
            expect(res.body.message).toBe('Created successfully')           
            expect(res.body.data[0].name).toBe('admin')
            expect(res.body.data[0].email).toBe('admin@gmail.com')
            expect(res.body.data[0].phone).toBe('0599999999')       
            if(err) return done(err)
            done()
        })
    });

    test('Expect a 406 status code and a validation error', (done) => {
        request(app)
        .post('/signup')
        .send({name: 'khaled', email: 'khaled@gmail.com', phone: '0599000000'})
        .expect(406)
        .end((err, res) => {
            expect(res.body.message).toBe('"password" is required')
            if(err) return done(err)
            done()
        })
    });

    test('Expect a 406 status code when entering a used email', (done) => {
      request(app)
      .post('/signup')
      .send({name: 'khaled', email: 'khaled@gmail.com', phone: '0599000000', password: '12345678'})
      .expect(406)
      .end((err, res) => {
        expect(res.body.message).toBe('Email already exists')
          if(err) return done(err)
          done()
      })
  })
})

describe('Testing the login on route "/login"', () => {
    test('Should return 200 status code with user information', (done) => {
        request(app)
        .post('/login')
        .send({email : 'khaled@gmail.com', password: '12345678'})
        .expect(200)
        .end((err,res) => {
            expect(res.body.message).toBe('Logged In Successfully')
            expect(res.body.data[0].email).toBe('khaled@gmail.com')
            if(err) return done(err)
            done()
        })
    });

    test('should return a 406 status and message of wrong password incase of entering a wrong password',(done) => {
        request(app)
        .post('/login')
        .send({email: 'khaled@gmail.com', password: 'wrong password'})
        .expect(406)
        .end((err, res) => {
            expect(res.body.message).toBe("Please enter correct password")
            if(err) done(err)
            done()
        })
    });

    test('should return a 406 status and message of wrong email incase of entering a wrong email',(done) => {
        request(app)
        .post('/login')
        .send({email: 'khaled11111111@gmail.com', password: '12345678'})
        .expect(406)
        .end((err, res) => {
            expect(res.body.message).toBe("wrong email")
            if(err) done(err)
            done()
        })
    })

    test('should return a 406 status and message of validation error incase of entering no password',(done) => {
        request(app)
        .post('/login')
        .send({ email: 'khaled@gmail.com' })
        .expect(406)
        .end((err, res) => {
            if(err) done(err);
            expect(res.body.message).toBe("\"password\" is required")
            done()
        })
    })
})

afterAll(() => connection.end())
