export default function(spec) {
  spec.describe('Sign Up', function() {
<<<<<<< HEAD
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

=======
    spec.it('SignUp and Login Test', async function() {
      var accountVar = Math.floor(Math.random() * Math.floor(9999));
      await spec.exists('Scene.Image');
      await spec.press('Scene.SignUpButton');
      await spec.fillIn(
        'Scene.SignUpEmail',
        `testemail${accountVar}@email.com`,
      );
      await spec.fillIn('Scene.SignUpPassword', `password${accountVar}`);
      await spec.press('Scene.handleSignUp');

      await spec.exists('Scene.Image');
      await spec.fillIn('Scene.LoginEmail', `testemail${accountVar}@email.com`);
      await spec.fillIn('Scene.LoginPassword', `password${accountVar}`);
      await spec.press('Scene.LoginButton');
      await spec.exists('Scene.studentHomeBackButton');
      await spec.press('Scene.studentHomeBackButton');
      //await spec.press('Scene.LoginButton');
>>>>>>> 4b9de7e7b2f7c4e8ae562bb4dc159376ea01f702
      //await spec.exists('Scene.ClassCard');
      //await spec.press('Scene.ClassCard');
    });
  });
}
