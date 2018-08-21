export default [{
		path: 'infoRegistration',
		component: () =>
			import('@/views/reservation/InformationRegistration.vue'),
		meta: {
			requiresId: true,
			sideActive: '/home/infoRegistration'
		}
	},
	{
		path: 'reservationQuery',
		component: () =>
			import('@/views/reservation/ReservationQuery.vue'),
		meta: {
			requiresId: true,
			sideActive: '/home/reservationQuery'
		}
	},
	{
		path: 'statisticsApply',
		component: () =>
			import('@/views/reservation/statisticsApply.vue'),
		meta: {
			requiresId: true,
			sideActive: '/home/statisticsApply'
		}
	},
	{
		path: 'statisticsReceive',
		component: () =>
			import('@/views/reservation/statisticsReceive.vue'),
		meta: {
			requiresId: true,
			sideActive: '/home/statisticsReceive'
		}
	},
	{
		path: 'statisticsList',
		component: () =>
			import('@/views/reservation/statisticsList.vue'),
		meta: {
			requiresId: true,
			sideActive: '/home/statisticsList'
		}
	},
	{
		path: 'blackList',
		component: () =>
			import('@/views/reservation/BlackList.vue'),
		meta: {
			requiresId: true,
			sideActive: '/home/blackList'
		}
	}
]