import app from "./app.js";
import './database.js';

app.listen(process.env.PORT || 1337);

console.log('Port',1337)
