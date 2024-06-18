from django.shortcuts import render, HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm

def custom_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            # Process login logic here
            return HttpResponseRedirect('/success/')  # Redirect to success page
    else:
        form = AuthenticationForm()

    return render(request, 'login.html', {'form': form})