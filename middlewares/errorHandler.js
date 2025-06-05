
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error Stack:', err.stack); // full stack in server logs

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only show stack trace in development (not in production)
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

export default errorHandler;
