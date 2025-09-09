const signUpButton=document.getElementbyId('signUpButton')
const signInButton=document.getElementbyId('signInButton')
const signInForm=document.getElementbyId('signInButton')

signUpButton.addEventListener('click', function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
   