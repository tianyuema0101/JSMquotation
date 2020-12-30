const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const installationRouter = require('./routes/installationRoutes')
const castingRouter = require('./routes/castingRoutes')
const inscriptionRouter = require('./routes/inscriptionRoutes')
const foundationRouter = require('./routes/foundationRoutes')
const accessoriesRouter = require('./routes/accessoriesRoutes')
const monumentRouter = require('./routes/monumentRoutes')
const quoteRouter = require('./routes/quoteRoutes')
const inscriptionQuoteRouter = require('./routes/inscriptionQuoteRoutes')
const ipAddressRouter = require('./routes/ipAddressRoutes')
const additionalInscrption = require('./routes/additionalInscriptionRoutes')
const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  return next();
});


app.use("/", express.static(path.join(__dirname, "dist/jsmcalculator")));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES
app.use('/api/v1/ipAddress', ipAddressRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/install', installationRouter);
app.use('/api/v1/casting', castingRouter);
app.use('/api/v1/inscription', inscriptionRouter);
app.use('/api/v1/foundation', foundationRouter);
app.use('/api/v1/accessories', accessoriesRouter);
app.use('/api/v1/monument', monumentRouter);
app.use('/api/v1/quote', quoteRouter);
app.use('/api/v1/inscriptionQuote', inscriptionQuoteRouter);
app.use('/api/v1/additionalInscription', additionalInscrption);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
