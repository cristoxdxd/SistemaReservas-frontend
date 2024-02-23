export const sendConfirmationEmail = async (email: any) => {
    const response = await fetch('/api/send-email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    if (response.ok) {
      console.log('Confirmation email sent');
    } else {
      console.error('Error sending confirmation email');
    }


  };