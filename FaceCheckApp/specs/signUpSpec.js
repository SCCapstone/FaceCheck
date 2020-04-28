export default function(spec) {
  spec.describe('Student SignUp', function() {
    spec.it('SignUp Test', async function() {
      var accountVar = Math.floor(Math.random() * Math.floor(9999));
      await spec.exists('Scene.Image');
      await spec.pause(100);
      await spec.exists('Scene.SignUpButton');
      await spec.press('Scene.SignUpButton');

      await spec.fillIn('Scene.SignUpEmail', `test${accountVar}@mail.com`);
      await spec.fillIn('Scene.SignUpPassword', `password`);
      await spec.pause(100);
      await spec.press('Scene.handleSignUp');
      await spec.pause(500);
      await spec.exists('Scene.studentHomeBackButton');
      await spec.pause(100);
      await spec.press('Scene.studentHomeBackButton');
    });
  });
}
