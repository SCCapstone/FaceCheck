export default function(spec) {
  spec.describe('Sign Up', function() {
    spec.it('Goes to SignUp and enters details', async function() {
      var accountVar = Math.floor(Math.random() * Math.floor(999));
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
      //await spec.press('Scene.LoginButton');
      //await spec.exists('Scene.ClassCard');
      //await spec.press('Scene.ClassCard');
    });
  });
}
