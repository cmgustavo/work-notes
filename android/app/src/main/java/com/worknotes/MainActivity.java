package com.worknotes;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactActivity;

import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "WorkNotes";
  }

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new AsyncStoragePackage()
        );
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
}
