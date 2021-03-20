<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * User
     * 
     * @var \App\Models\User
     */
    private $user;
    
    /**
     * Token
     * 
     * @var string
     */
    private $token;

    /**
     * Create a new message instance.
     *
     * @param \App\Models\User $user
     * @param string $token
     * @return void
     */
    public function __construct(User $user, string $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject(__('auth.reset_password_mail'))->view('emails.reset_password', ['user' => $this->user, 'token' => $this->token]);
    }
}
