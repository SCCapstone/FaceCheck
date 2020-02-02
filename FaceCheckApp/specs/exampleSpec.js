export default function(spec) {
  spec.describe('Sign Up', function() {
    spec.it('Goes to SignUp and enters details', async function() {
      await spec.exists('Scene.Image');
      await spec.press('Scene.SignUpButton');
      setTimeout(200);

      await spec.fillIn('Scene.SignUpEmail', 'testemail@email.com');
      setTimeout(200);

      await spec.fillIn('Scene.SignUpPassword', 'password');
      setTimeout(200);

      await spec.press('Scene.handleSignUp');
      setTimeout(200);

      await spec.exists('Scene.Image');
      setTimeout(200);

      await spec.fillIn('Scene.LoginEmail', 'testemail@gmail.com');
      setTimeout(200);

      await spec.fillIn('Scene.LoginPassword', 'password');
      setTimeout(200);

      await spec.press('Scene.LoginButton');
      setTimeout(200);

      //await spec.exists('Scene.ClassCard');
      //await spec.press('Scene.ClassCard');
    });
  });
}
