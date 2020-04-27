export default function(spec) {
  spec.describe('Teacher Navigation', function() {
    spec.it('Login Test', async function() {
      await spec.pause(500);
      await spec.exists('Scene.studentHomeBackButton');
      await spec.press('Scene.studentHomeBackButton');
      await spec.exists('Scene.Image');
      await spec.pause(100);
      await spec.fillIn('Scene.LoginEmail', `samnichols314@gmail.com`);
      await spec.fillIn('Scene.LoginPassword', `apple359`);
      await spec.pause(100);
      await spec.press('Scene.LoginButton');
      await spec.pause(100);
      await spec.exists('Scene.LoadingPage');
      await spec.pause(100);
      await spec.exists('Scene.teacherHomeBackButton');
    });
    spec.it('TeacherClassCard Test', async function() {
      await spec.exists('Scene.teacherClassCards');
      await spec.press('Scene.teacherClassCards');
      await spec.pause(100);

      await spec.exists('Scene.teacherQRScanner');
      await spec.press('Scene.teacherQRScanner');
      await spec.pause(100);

      await spec.exists('Scene.QRScannerBackButton');
      await spec.press('Scene.QRScannerBackButton');
      await spec.pause(100);

      await spec.exists('Scene.teacherClassScreenBackButton');
      await spec.press('Scene.teacherClassScreenBackButton');
      await spec.pause(100);

      await spec.exists('Scene.teacherHomeBackButton');
      await spec.press('Scene.teacherHomeBackButton');
      await spec.pause(100);
    });
  });
}
