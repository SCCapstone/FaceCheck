export default function(spec) {
  spec.describe('Logging in', function() {
    spec.it('logs in', async function() {
      await spec.exists('Scene.Image');
      await spec.fillIn('Scene.Email', 'samnichols314@gmail.com');
      await spec.fillIn('Scene.Password', 'apple359');
      await spec.press('Scene.LoginButton');
    });
  });
}
