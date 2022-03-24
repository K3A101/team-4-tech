module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd2327675a8dd9f68ba1563c25c7a4ae3'),
  },
});
