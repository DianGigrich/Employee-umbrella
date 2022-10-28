const msyql = require('mysql12')
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Th1s1s1t!',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

db.query('SELECT IGOR FROM students WHEN )
db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get(""/api/books",(req,res)=> {})
db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
 res.json(results)
});