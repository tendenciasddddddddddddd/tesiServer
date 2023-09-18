import app from "./app.js";
import './database.js';

app.listen(process.env.PORT || 4000);

console.log('Port',4000)
