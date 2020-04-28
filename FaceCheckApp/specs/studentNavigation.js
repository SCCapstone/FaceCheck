export default function(spec) {
  spec.describe('Student Navigation', function() {
    spec.it('SignUp and Login Test', async function() {
      var accountVar = Math.floor(Math.random() * Math.floor(9999));
      await spec.exists('Scene.Image');
      await spec.pause(100);
      await spec.fillIn('Scene.LoginEmail', `test@mail.com`);
      await spec.fillIn('Scene.LoginPassword', `password`);
      await spec.pause(100);
      await spec.press('Scene.LoginButton');
      await spec.pause(100);
      await spec.exists('Scene.LoadingPage');
      await spec.exists('Scene.studentHomeBackButton');
      await spec.exists('Scene.ClassCards');
      await spec.pause(500);
      await spec.press('Scene.ClassCards');
      await spec.exists('Scene.studentClassBackButton');
      await spec.pause(100);
      await spec.press('Scene.studentClassBackButton');
    });
  });
}
