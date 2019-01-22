#import <UIKit/UIKit.h>

@class GIDSignInButton;

// A view controller for the Google+ sign-in button which initiates a standard
// OAuth 2.0 flow and provides an access token and a refresh token. A "Sign out"
// button is provided to allow users to sign out of this application.
@interface SignInViewController : UITableViewController<UIAlertViewDelegate>

@property(weak, nonatomic) IBOutlet GIDSignInButton *signInButton;
// A label to display the result of the sign-in action.
@property(weak, nonatomic) IBOutlet UILabel *signInAuthStatus;
// A label to display the signed-in user's display name.
@property(weak, nonatomic) IBOutlet UILabel *userName;
// A label to display the signed-in user's email address.
@property(weak, nonatomic) IBOutlet UILabel *userEmailAddress;
// An image view to display the signed-in user's avatar image.
@property(weak, nonatomic) IBOutlet UIImageView *userAvatar;
// A button to sign out of this application.
@property(weak, nonatomic) IBOutlet UIButton *signOutButton;
// A button to disconnect user from this application.
@property(weak, nonatomic) IBOutlet UIButton *disconnectButton;
// A button to inspect the authorization object.
@property(weak, nonatomic) IBOutlet UIButton *credentialsButton;
// A dynamically-created slider for controlling the sign-in button width.
@property(weak, nonatomic) UISlider *signInButtonWidthSlider;

// Called when the user presses the "Sign out" button.
- (IBAction)signOut:(id)sender;
// Called when the user presses the "Disconnect" button.
- (IBAction)disconnect:(id)sender;
// Called when the user presses the "Credentials" button.
- (IBAction)showAuthInspector:(id)sender;

@end
