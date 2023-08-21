import app from "./app.js";
import './database.js';

app.listen(process.env.PORT || 3000);

console.log('Port',3000)
