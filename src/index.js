import app from "./app.js";
import './database.js';

app.listen(process.env.PORT || 5000);

console.log('Port',5000)
