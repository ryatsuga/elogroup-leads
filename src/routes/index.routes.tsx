import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider, RedirectAuth, RequireAuth } from '../hooks/auth';
import { LeadsProvider } from '../hooks/leads';
import { Home } from '../pages/Home';
import { Landing } from '../pages/Landing';
import { NewLead } from '../pages/NewLead';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export function AppRoutes() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path={'/'}
						element={
							<RedirectAuth>
								<Landing />
							</RedirectAuth>
						}
					/>
					<Route
						path={'/sign-up'}
						element={
							<RedirectAuth>
								<SignUp />
							</RedirectAuth>
						}
					/>
					<Route
						path={'/sign-in'}
						element={
							<RedirectAuth>
								<SignIn />
							</RedirectAuth>
						}
					/>
					<Route
						path={'/home'}
						element={
							<RequireAuth>
								<LeadsProvider>
									<Home />
								</LeadsProvider>
							</RequireAuth>
						}
					/>
					<Route
						path={'/new-lead'}
						element={
							<RequireAuth>
								<LeadsProvider>
									<NewLead />
								</LeadsProvider>
							</RequireAuth>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
