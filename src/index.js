import app from "./app.js";
import './database.js';

app.listen(process.env.PORT || 5001);

console.log('Port',5001)
