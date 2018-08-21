import Vue from 'vue'
import Router from 'vue-router'
import Reservation from './reservation-route'
// import Login from '@/components/page/Login'
// import home from '@/components/page/home'
// import dataStats from '@/components/page/dataStats'
// import dataStats2 from '@/components/page/dataStats2'
// import hospitalList from '@/components/page/hospitalList'
// import account from '@/components/page/account'

Vue.use(Router)

export default new Router({//懒加载
	// mode: 'history',
	routes: [
		{ path: '', name: 'index', component: () => import('@/components/page/index') },
		{ path: '/Login', name: 'Login', component: () => import('@/components/page/Login') },
		{ path: '/report', name: 'report', component: () => import('@/components/page/report'), meta: { requiresId: true } },
		{ path: '/editReport', name: 'editReport', component: () => import('@/components/page/editReport'), meta: { requiresId: true } },
		{ path: '/consultation', name: 'consultation', component: () => import('@/components/page/consultation'), meta: { requiresId: true } },
		{
			path: '/home', component: () => import('@/components/page/home'), meta: { requiresId: true },
			children: [
				{ path: '', redirect: 'dataStats' },
				{
					path: 'dataStats', component: () => import('@/components/page/dataStats'),
					meta: { requiresId: true, sideActive: '/home/dataStats' }
				},
				{
					path: 'dataStats2', component: () => import('@/components/page/dataStats2'),
					meta: { requiresId: true, sideActive: '/home/dataStats2' }
				},
				{
					path: 'hospitalList', component: () => import('@/components/page/hospitalList'),
					meta: { requiresId: true, sideActive: '/home/hospitalList' }
				},
				{
					path: 'account', component: () => import('@/components/page/account'),
					meta: { requiresId: true, sideActive: '/home/account' }
				},
				{
					path: 'doctorCreat', component: () => import('@/components/page/doctorCreat'),
					meta: { requiresId: true, sideActive: '/home/doctorCreat' }
				},
				{
					path: 'serverList', component: () => import('@/components/page/serverList'),
					meta: { requiresId: true, sideActive: '/home/serverList' }
				},
				{
					path: 'myPatient/:jump*', component: () => import('@/components/page/myPatient'),
					meta: { requiresId: true, sideActive: '/home/myPatient' }
				},
				{
					path: 'myConsultation/:jump*', component: () => import('@/components/page/myConsultation'),
					meta: { requiresId: true, sideActive: '/home/myConsultation' }
				},
				{
					path: 'map', component: () => import('@/components/page/map'),
					meta: { requiresId: true, sideActive: '/home/map' }
				},
				{
					path: 'chscList', component: () => import('@/components/page/chscList'),
					meta: { requiresId: true, sideActive: '/home/chscList' }
				},
				{
					path: 'cloudFilm', component: () => import('@/components/page/cloudFilm'),
					meta: { requiresId: true, sideActive: '/home/cloudFilm' }
				},
				{
					path: 'consultationList', component: () => import('@/components/page/consultationList'),
					meta: { requiresId: true, sideActive: '/home/consultationList' }
				},
				{
					path: 'expertExamine', component: () => import('@/components/page/expertExamine'),
					meta: { requiresId: true, sideActive: '/home/expertExamine' }
				},
				{
					path: 'patientList', component: () => import('@/components/page/patientList'),
					meta: { requiresId: true, sideActive: '/home/patientList' }
				},
				{
					path: 'teleConsultion', component: () => import('@/components/page/teleConsultion'),
					meta: { requiresId: true, sideActive: '/home/teleConsultion' }
				},
//				{
//					path: 'teleConsultList', component: () => import('@/components/page/teleConsultList'),
//					meta: { requiresId: true, sideActive: '/home/teleConsultList' }
//				},
//				{
//					path: 'teleConsultList', component: () => import('@/components/chatRoom/teleConsultList'),
//					meta: { requiresId: true, sideActive: '/home/teleConsultList' }
//				},
			   ...Reservation
			]
		}
	]
})

