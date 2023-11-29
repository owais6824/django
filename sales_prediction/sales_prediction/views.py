from django.shortcuts import render
def index(request):
    return render(request,'index.html')

def about(request):
    return render(request,'about.html')

def u_input(request):
    return render(request,'u_input.html')

def view(request):
    email = request.GET['email']
    password = request.GET['pass']
    data={
        'email' :email,
        'password' : password
    }
    return render(request,'view.html', data)