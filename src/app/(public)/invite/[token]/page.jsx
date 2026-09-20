import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { invitationsApi, authApi } from '@/lib/api-client';
import { toast } from 'sonner';
import Link from 'next/link';
import { LandingFooter } from '@/components/landing-footer';
import {
  Building2,
  FolderGit2,
  CheckCircle2,
  Users,
  ArrowRight,
  Shield,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  Lock,
  Mail,
  Eye,
  EyeOff,
} from 'lucide-react';

export const InvitationAcceptancePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [invitation, setInvitation] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  // Direct login on invitation page state
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [inviteRes, userRes] = await Promise.allSettled([
          invitationsApi.getInvitationByToken(token),
          authApi.getCurrentUser(),
        ]);

        if (inviteRes.status === 'fulfilled' && inviteRes.value?.data) {
          setInvitation(inviteRes.value.data);
        } else {
          toast.error('Invitation link is invalid or expired.');
        }

        if (userRes.status === 'fulfilled' && userRes.value?.data) {
          setCurrentUser(userRes.value.data);
        }
      } catch (err) {
        toast.error('Failed to load invitation');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  const handleAccept = async () => {
    try {
      setAccepting(true);
      const res = await invitationsApi.acceptInvitation(token);
      toast.success(`Welcome to ${invitation.organizationName}!`);
      window.location.href = `/workspaces/${res.workspaceId}`;
    } catch (err) {
      toast.error(err.message || 'Failed to accept invitation');
    } finally {
      setAccepting(false);
    }
  };

  const handleDirectLoginAndAccept = async (e) => {
    e.preventDefault();
    if (!loginPassword) {
      toast.error('Please enter your password.');
      return;
    }

    try {
      setSigningIn(true);
      // 1. Log in with the invited email and provided password
      await authApi.login({
        email: invitation.email,
        password: loginPassword,
      });

      // 2. Accept the invitation
      const res = await invitationsApi.acceptInvitation(token);
      toast.success(`🎉 Authenticated & joined ${invitation.organizationName}!`);
      window.location.href = `/workspaces/${res.workspaceId}`;
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your password or register.');
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#091E42] flex items-center justify-center text-white">
        <RefreshCw className="size-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-[#091E42] flex flex-col items-center justify-between text-white">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md rounded-3xl border border-white/20 bg-neutral-900/95 p-8 text-center space-y-4 shadow-2xl">
            <AlertTriangle className="size-12 mx-auto text-amber-400" />
            <h2 className="text-xl font-bold">Invalid or Expired Invitation Link</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              This invitation link is expired, revoked, or invalid. Please check the URL or contact your workspace owner.
            </p>
            <Link
              href="/sign-in"
              className="inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-blue-500 transition"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
        <LandingFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#091E42] flex flex-col justify-between text-white select-none">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 py-16">
        <div className="w-full max-w-md rounded-3xl border border-white/20 bg-neutral-900/95 p-8 shadow-2xl space-y-6 text-neutral-200">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="size-12 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
              K
            </div>
            <h1 className="text-2xl font-black text-white">You've been invited!</h1>
            <p className="text-xs text-neutral-400">
              <span className="font-bold text-white">{invitation.inviterName}</span> invited you to collaborate on KlanServiceHub.
            </p>
          </div>

          {/* Organization & Project Context Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3.5 text-xs">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Building2 className="size-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Organization</span>
                <span className="text-sm font-bold text-white">{invitation.organizationName}</span>
              </div>
            </div>

            {invitation.projectName && (
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="size-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <FolderGit2 className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Assigned Project</span>
                  <span className="text-sm font-bold text-white">{invitation.projectName}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
              <span className="text-neutral-400">Invited Email:</span>
              <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                {invitation.email}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
              <span className="text-neutral-400">Assigned Role:</span>
              <span className="rounded-full bg-blue-500/20 text-blue-400 px-2.5 py-0.5 font-bold">
                {invitation.organizationRole}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-1">
            {currentUser ? (
              <button
                onClick={handleAccept}
                disabled={accepting}
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {accepting ? <RefreshCw className="size-4 animate-spin" /> : <span>Accept & Join {invitation.organizationName}</span>}
                {!accepting && <ArrowRight className="size-4" />}
              </button>
            ) : (
              <div className="space-y-4">
                {/* Instant Inline Login Form */}
                <form onSubmit={handleDirectLoginAndAccept} className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-left">
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                      Enter Password to Join:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Your password or temporary password"
                        required
                        className="w-full rounded-xl bg-white border border-neutral-300 px-3.5 py-2.5 pr-10 text-xs font-semibold text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={signingIn}
                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {signingIn ? <RefreshCw className="size-4 animate-spin" /> : <span>Sign In & Join Workspace</span>}
                    {!signingIn && <ArrowRight className="size-4" />}
                  </button>
                </form>

                <div className="text-center space-y-2 pt-1">
                  <div className="text-[11px] text-neutral-400">
                    Need to create a new account or sign in with OTP?
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/sign-in?token=${token}&email=${encodeURIComponent(invitation.email)}`}
                      className="flex-1 rounded-xl border border-white/20 hover:bg-white/10 py-2.5 text-xs font-bold text-neutral-200 transition text-center"
                    >
                      Sign In Options
                    </Link>
                    <Link
                      href={`/sign-up?token=${token}&email=${encodeURIComponent(invitation.email)}`}
                      className="flex-1 rounded-xl border border-white/20 hover:bg-white/10 py-2.5 text-xs font-bold text-neutral-200 transition text-center"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
};

export default InvitationAcceptancePage;
