from flask import *
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import  smtplib
from email.mime.text import MIMEText
#from product import *


 
app = Flask(__name__)
CORS(app,origins=["http://localhost:3000","http://127.0.0.1:988"])
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/kanona'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Creating an instance of the SQLAlchemy class
db = SQLAlchemy(app)
app.app_context().push()



class Product(db.Model):
    id=db.Column(db.Integer,autoincrement=True)
    name=db.Column(db.String(100),primary_key = True)
    price=db.Column(db.Integer)
    photo=db.Column(db.String(100))
    details=db.Column(db.String(100))
    pfamily=db.Column(db.String(100))
    def __init__(self,name,price,photo,details,pfamily):
        self.name=name
        self.price=price
        self.photo=photo
        self.details=details
        self.pfamily=pfamily

class account(db.Model):
    
    name=db.Column(db.String(50))
    email=db.Column(db.String(100),primary_key = True)
    password=db.Column(db.String(20))

    def __init__(self,id,name,email,password):
        self.id=id
        self.name=name
        self.email=email
        self.password=password

@app.route('/data', methods=['GET'])
def get_all_products():
    dataProducts = Product.query.all()
    user_list = [{'id': dataProduct.id, 'name': dataProduct.name,'price':dataProduct.price,'photo':dataProduct.photo,'details':dataProduct.details,'pfamily':dataProduct.pfamily} for dataProduct in dataProducts]
    return jsonify(user_list),200

@app.route('/upload',methods=["POST"])
def upload():
    if request.method=="POST":
        print(request.json)

@app.route('/product',methods=["POST"])
def addPoduct():
    if request.method=="POST":#id: auto incremmt, name:string ,price :int ,photo:stringUrl,details:string
        name=request.json['name']
        price=request.json['price']
        photo=request.json['photo']
        details=request.json['details']
        pfamily=request.json['pfamily']
        if name is not None and price is  not None and photo is not None and details is not None and pfamily is not None:
            if (Product.query.filter_by(name=name).first()):
                return jsonify({"error":"product already exists"}),409
            else:
                productObject=Product(name,price,photo,details,pfamily)
                db.session.add(productObject)
                db.session.commit()
                return jsonify({"message":"successfully added product"}),200

        else:
            return jsonify({"error":"give valid data"}),204
        
@app.route('/update',methods=['PUT'])
def update_Product():
    if request.method=="PUT":#id: auto incremmt, name:string ,price :int ,photo:stringUrl,details:string
        name=request.json['name']
        price=request.json['price']
        photo=request.json['photo']
        details=request.json['details']
        pfamily=request.json['pfamily']
        if name is not None and price is  not None and photo is not None and details is not None and pfamily is not None:
            db_Product=Product.query.filter_by(name=name).first()
            if db_Product:
                db_Product.price=price
                db_Product.photo=photo
                db_Product.details=details
                db_Product.pfamily=pfamily
                db.session.commit()
                return jsonify({"message":"updated successfully"})
            else:
                return jsonify({"error":"your are product dose't exist"})
        else:
            return jsonify({"error":"please give valid data"})

            
        

@app.route('/delete/<product>', methods=['DELETE'])
def delete_user(product):
    product = Product.query.get(product)
    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404
@app.route('/login',methods=["POST"])
def login():
    if request.method=="POST":
        email=request.json['username']
        password=request.json['pass']
        if email is not None:
            if account.query.filter_by(email=email).first():
                if password == (account.query.get(email)).password:
                    return jsonify({'message':'user exists'}),200
                else:
                    return jsonify({'error':'incorrect password'}),401
            else:
                return jsonify({'error':'user not found'}),404
        else:
            return jsonify({'error':'proved null data'}),204
# @app.route('/reg',methods=['POST'])
# def registration():
#     if request.method=="POST":
#         name=request.json['name']
#         username= request.json['username']
#         date=request.json['date'] 
#         password=request.json['password']
#         if Reg.query.filter_by(username=username).first():
#             return jsonify({'error': 'Username already exists'}), 409
#         if   name != None and  username !=None and  date!=None and   password!=None:

#             db.session.add(Reg(name,username,date,password))
#             db.session.commit()
#             return jsonify({'message':'successfully added data'}),201
#         else:
#             return jsonify({'error':'provide vaild data'}),400

@app.route('/send',methods=["POST"])
def sendEmail():
    if request.method=="POST":
        recipient=request.json['useremail']

        email_text = f"""
        you logged into the asait.com
        """
        GMAIL_USERNAME = "bogineniyaswanthkumarasait"
        GMAIL_APP_PASSWORD = "whajrtycyaryfdksl"
        # recipients = ["yaswanthkumarbogineni@gmail.com"]
        msg = MIMEText(email_text)
        msg["Subject"] = "Email report: a simple sum"
        msg["To"] = ", ".join(recipient)
        msg["From"] = f"{GMAIL_USERNAME}@gmail.com"
        smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        smtp_server.login(GMAIL_USERNAME, GMAIL_APP_PASSWORD)
        smtp_server.sendmail(msg["From"], recipient, msg.as_string())
        smtp_server.quit()
        return jsonify({"message":"successfully sent"}),200


if __name__=='__main__':
    app.run(debug=True,port=988)