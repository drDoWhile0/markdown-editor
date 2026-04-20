import { useState } from 'react';
import { supabase } from '../supabaseClient';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) setError(error.message);
            else setMessage('Check your email to confirm your account.');
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setError(error.message);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen bg-[#0d0d0d]'>
            <div className='bg-[#1E1E1E] p-10 rounded-md w-full max-w-md'>
                <h1 className='text-white text-2xl font-bold mb-6'>
                    {isSignUp ? 'Create an account' : 'Sign In'}
                </h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input 
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='bg-[#0d0d0d] text-white px-4 py-2 rounded-sm outline-none'
                    />
                    <input 
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='bg-[#0d0d0d] text-white px-4 py-2 rounded-sm outline-none'
                    />
                    {error && <p className='text-red-400 text-sm'>{error}</p>}
                    {message && <p className='text-green-400 text-sm'>{message}</p>}
                    <button type='submit' className='bg-[#ff6a00] text-white py-2 rounded-sm cursor-pointer'>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                <p className='text-gray-400 text-sm mt-4'>
                    {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
                    <button onClick={() => setIsSignUp(!isSignUp)} className='text-[#ff6a00] ml-1 cursor-pointer'>
                        {isSignUp ? 'Sign in' : 'Sign up'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Auth;