/* eslint-disable import/no-extraneous-dependencies */
const hpp = require('hpp');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const AppError = require('./util/appError');
const authRouter = require('./routes/authRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const patientRouter = require('./routes/patientRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

const corsOptions = {
  origin: true
};

// 1) MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same IP address
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again after an hour.'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Cookie parser
app.use(cookieParser());

// Use CORS options
app.use(cors(corsOptions));

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS (Cross Site Request Forgery)
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: []
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/patients', patientRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

// error middleware
app.use(globalErrorHandler);

module.exports = app;
