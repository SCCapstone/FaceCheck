export default function(spec) {
  spec.describe('Sign Up', function() {
    spec.it('Goes to SignUp and enters details', async function() {
      await spec.exists('Scene.Image');
      await spec.press('Scene.SignUpButton');
      await spec.fillIn('Scene.SignUpEmail', 'testemail@email.com');
      await spec.fillIn('Scene.SignUpPassword', 'password');
      await spec.press('Scene.handleSignUp');

      await spec.exists('Scene.Image');
      await spec.fillIn('Scene.LoginEmail', 'testemail@gmail.com');
      await spec.fillIn('Scene.LoginPassword', 'password');
      await spec.press('Scene.LoginButton');

      //await spec.exists('Scene.ClassCard');
      //await spec.press('Scene.ClassCard');
    });
  });
}
