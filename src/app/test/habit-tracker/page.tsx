'use client';
import React, { useState, useEffect } from 'react';
import {
	Clock,
	Plus,
	Check,
	Home,
	Calendar,
	Edit2,
	Trash2,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';

const HabitTrackerApp = () => {
	const [currentPage, setCurrentPage] = useState('home');
	const [routines, setRoutines] = useState([]);
	const [dailyChecks, setDailyChecks] = useState({});
	const [showAddRoutine, setShowAddRoutine] = useState(false);
	const [editingRoutine, setEditingRoutine] = useState(null);
	const [viewMode, setViewMode] = useState('day');
	const [selectedDate, setSelectedDate] = useState(new Date());

	useEffect(() => {
		const loadData = async () => {
			try {
				const routinesData = await window.storage.get('routines');
				if (routinesData) {
					setRoutines(JSON.parse(routinesData.value));
				}

				const today = new Date().toISOString().split('T')[0];
				const checksData = await window.storage.get(`checks_${today}`);
				if (checksData) {
					setDailyChecks(JSON.parse(checksData.value));
				}
			} catch (error) {
				console.log('No existing data');
			}
		};
		loadData();
	}, []);

	const saveRoutines = async (newRoutines) => {
		setRoutines(newRoutines);
		await window.storage.set('routines', JSON.stringify(newRoutines));
	};

	const saveDailyChecks = async (checks) => {
		setDailyChecks(checks);
		const today = new Date().toISOString().split('T')[0];
		await window.storage.set(`checks_${today}`, JSON.stringify(checks));
	};

	const getMotivationQuote = () => {
		const completedCount = Object.values(dailyChecks).filter(
			(v) => v
		).length;
		const totalCount = routines.filter((r) => r.isActive).length;

		if (completedCount === totalCount && totalCount > 0) {
			const successQuotes = [
				'Tuyệt vời! Bạn đã giữ lời với chính mình. 🌟',
				'Hoàn hảo! Đây là cách xây dựng cuộc sống bạn muốn. ✨',
				'Tuyệt đỉnh! Mỗi ngày như vậy là một bước tiến lớn. 💪',
			];
			return successQuotes[
				Math.floor(Math.random() * successQuotes.length)
			];
		} else if (completedCount > 0) {
			return 'Tốt lắm! Tiếp tục duy trì nhé. 🌱';
		} else {
			return 'Không sao. Ngày mai sẽ tốt hơn hôm nay. 🌱';
		}
	};

	const handleSaveRoutine = (routine) => {
		if (editingRoutine) {
			const updated = routines.map((r) =>
				r.id === routine.id ? routine : r
			);
			saveRoutines(updated);
		} else {
			const newRoutine = {
				...routine,
				id: Date.now().toString(),
				createdAt: new Date().toISOString(),
			};
			saveRoutines([...routines, newRoutine]);
		}
		setShowAddRoutine(false);
		setEditingRoutine(null);
	};

	const handleDeleteRoutine = (id) => {
		if (window.confirm('Bạn có chắc muốn xóa thói quen này?')) {
			saveRoutines(routines.filter((r) => r.id !== id));
		}
	};

	const toggleCompletion = (routineId) => {
		const newChecks = {
			...dailyChecks,
			[routineId]: !dailyChecks[routineId],
		};
		saveDailyChecks(newChecks);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<header className='bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10'>
				<div className='max-w-6xl mx-auto px-4 py-4 flex justify-between items-center'>
					<h1 className='text-2xl font-bold text-emerald-600'>
						Daily Routine
					</h1>
					<div className='flex gap-2'>
						<button
							onClick={() => setCurrentPage('home')}
							className={`p-2 rounded-lg ${
								currentPage === 'home'
									? 'bg-emerald-100 text-emerald-600'
									: 'text-gray-600 hover:bg-gray-100'
							}`}>
							<Home size={20} />
						</button>
						<button
							onClick={() => setCurrentPage('timeline')}
							className={`p-2 rounded-lg ${
								currentPage === 'timeline'
									? 'bg-emerald-100 text-emerald-600'
									: 'text-gray-600 hover:bg-gray-100'
							}`}>
							<Calendar size={20} />
						</button>
						<button
							onClick={() => setCurrentPage('routines')}
							className={`p-2 rounded-lg ${
								currentPage === 'routines'
									? 'bg-emerald-100 text-emerald-600'
									: 'text-gray-600 hover:bg-gray-100'
							}`}>
							<Clock size={20} />
						</button>
					</div>
				</div>
			</header>

			<main className='max-w-6xl mx-auto px-4 py-8'>
				{currentPage === 'home' && (
					<HomePage
						routines={routines}
						dailyChecks={dailyChecks}
						onToggle={toggleCompletion}
						motivationQuote={getMotivationQuote()}
					/>
				)}

				{currentPage === 'timeline' && (
					<TimelinePage
						routines={routines}
						dailyChecks={dailyChecks}
						onToggle={toggleCompletion}
						viewMode={viewMode}
						setViewMode={setViewMode}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
					/>
				)}

				{currentPage === 'routines' && (
					<RoutinesPage
						routines={routines}
						onAdd={() => setShowAddRoutine(true)}
						onEdit={(routine) => {
							setEditingRoutine(routine);
							setShowAddRoutine(true);
						}}
						onDelete={handleDeleteRoutine}
						onToggleActive={(id) => {
							const updated = routines.map((r) =>
								r.id === id
									? { ...r, isActive: !r.isActive }
									: r
							);
							saveRoutines(updated);
						}}
					/>
				)}
			</main>

			{showAddRoutine && (
				<RoutineModal
					routine={editingRoutine}
					onSave={handleSaveRoutine}
					onClose={() => {
						setShowAddRoutine(false);
						setEditingRoutine(null);
					}}
				/>
			)}
		</div>
	);
};

const HomePage = ({ routines, dailyChecks, onToggle, motivationQuote }) => {
	const activeRoutines = routines.filter((r) => r.isActive);
	const completedCount = activeRoutines.filter(
		(r) => dailyChecks[r.id]
	).length;
	const currentHour = new Date().getHours();
	const isMorning = currentHour < 12;

	return (
		<div className='space-y-6'>
			<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6'>
				{isMorning ? (
					<div className='text-center'>
						<h2 className='text-2xl font-bold text-gray-800 mb-2'>
							Good Morning! ☀️
						</h2>
						<p className='text-gray-600'>
							Today you have {activeRoutines.length} routine
							{activeRoutines.length !== 1 ? 's' : ''}, let's do
							it 💪
						</p>
					</div>
				) : (
					<div className='text-center'>
						<h2 className='text-2xl font-bold text-gray-800 mb-2'>
							Evening Checklist 🌙
						</h2>
						<p className='text-gray-600'>
							You completed {completedCount} out of{' '}
							{activeRoutines.length} routines today
						</p>
					</div>
				)}
			</div>

			<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6'>
				<h3 className='text-xl font-semibold text-gray-800 mb-4'>
					Today's Tasks
				</h3>
				{activeRoutines.length === 0 ? (
					<p className='text-gray-500 text-center py-8'>
						No routines yet. Add your first routine to get started!
					</p>
				) : (
					<div className='space-y-3'>
						{activeRoutines.map((routine) => (
							<div
								key={routine.id}
								onClick={() => onToggle(routine.id)}
								className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
									dailyChecks[routine.id]
										? 'bg-green-50 border-2 border-green-500'
										: 'bg-gray-50 border-2 border-gray-200 hover:border-emerald-300'
								}`}>
								<div
									className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
										dailyChecks[routine.id]
											? 'bg-green-500 border-green-500'
											: 'border-gray-300'
									}`}>
									{dailyChecks[routine.id] && (
										<Check
											size={16}
											className='text-white'
										/>
									)}
								</div>
								<div className='flex-1'>
									<h4
										className={`font-medium ${
											dailyChecks[routine.id]
												? 'text-green-700 line-through'
												: 'text-gray-800'
										}`}>
										{routine.title}
									</h4>
									<p className='text-sm text-gray-500'>
										{routine.timeOfDay}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{!isMorning && activeRoutines.length > 0 && (
				<div className='bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white text-center'>
					<p className='text-lg font-medium'>{motivationQuote}</p>
				</div>
			)}
		</div>
	);
};

const TimelinePage = ({
	routines,
	dailyChecks,
	onToggle,
	viewMode,
	setViewMode,
	selectedDate,
	setSelectedDate,
}) => {
	const activeRoutines = routines
		.filter((r) => r.isActive)
		.sort((a, b) => {
			return a.timeOfDay.localeCompare(b.timeOfDay);
		});

	const goToPreviousDay = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() - 1);
		setSelectedDate(newDate);
	};

	const goToNextDay = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + 1);
		setSelectedDate(newDate);
	};

	const goToToday = () => {
		setSelectedDate(new Date());
	};

	const isToday = selectedDate.toDateString() === new Date().toDateString();

	const getWeekDays = () => {
		const days = [];
		const startOfWeek = new Date(selectedDate);
		const day = startOfWeek.getDay();
		const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
		startOfWeek.setDate(diff);

		for (let i = 0; i < 7; i++) {
			const date = new Date(startOfWeek);
			date.setDate(startOfWeek.getDate() + i);
			days.push(date);
		}
		return days;
	};

	if (viewMode === 'week') {
		const weekDays = getWeekDays();

		return (
			<div className='space-y-6'>
				<div className='flex justify-between items-center'>
					<h2 className='text-2xl font-bold text-gray-800'>
						Weekly View
					</h2>
					<div className='flex gap-2'>
						<button
							onClick={() => setViewMode('day')}
							className='px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors'>
							Day View
						</button>
					</div>
				</div>

				<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 overflow-x-auto'>
					<div className='min-w-max'>
						<div className='grid grid-cols-8 gap-4 mb-4'>
							<div className='text-sm font-medium text-gray-600'>
								Time
							</div>
							{weekDays.map((date, i) => (
								<div key={i} className='text-center'>
									<div className='text-sm font-medium text-gray-800'>
										{date.toLocaleDateString('en-US', {
											weekday: 'short',
										})}
									</div>
									<div className='text-xs text-gray-500'>
										{date.toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
										})}
									</div>
								</div>
							))}
						</div>

						<div className='space-y-2'>
							{activeRoutines.map((routine) => (
								<div
									key={routine.id}
									className='grid grid-cols-8 gap-4 items-center py-3 border-t border-gray-100'>
									<div className='flex items-center gap-2'>
										<div className='text-sm font-medium text-gray-600 min-w-16'>
											{routine.timeOfDay}
										</div>
									</div>
									{weekDays.map((date, i) => {
										const dayName = date.toLocaleDateString(
											'en-US',
											{ weekday: 'short' }
										);
										const isRoutineDay =
											routine.repeat.includes(dayName);

										return (
											<div
												key={i}
												className='flex justify-center'>
												{isRoutineDay ? (
													<div className='w-full bg-emerald-100/50 rounded-lg p-3 text-sm'>
														<div className='font-medium text-gray-800 truncate'>
															{routine.title}
														</div>
													</div>
												) : (
													<div className='w-full h-12'></div>
												)}
											</div>
										);
									})}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-bold text-gray-800'>
					Daily Timeline
				</h2>
				<div className='flex gap-2'>
					<button
						onClick={() => setViewMode('week')}
						className='px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors'>
						Week View
					</button>
				</div>
			</div>

			<div className='flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl shadow p-4'>
				<button
					onClick={goToPreviousDay}
					className='p-2 hover:bg-gray-100 rounded-lg'>
					<ChevronLeft size={20} />
				</button>
				<div className='text-center'>
					<h3 className='text-lg font-semibold text-gray-800'>
						{selectedDate.toLocaleDateString('en-US', {
							weekday: 'long',
							month: 'long',
							day: 'numeric',
						})}
					</h3>
					{!isToday && (
						<button
							onClick={goToToday}
							className='text-sm text-emerald-600 hover:underline mt-1'>
							Go to Today
						</button>
					)}
				</div>
				<button
					onClick={goToNextDay}
					className='p-2 hover:bg-gray-100 rounded-lg'>
					<ChevronRight size={20} />
				</button>
			</div>

			<div
				className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 relative'
				style={{
					backgroundImage:
						'linear-gradient(to bottom, rgba(16, 185, 129, 0.05), rgba(20, 184, 166, 0.05))',
				}}>
				{activeRoutines.length === 0 ? (
					<p className='text-gray-500 text-center py-12'>
						No routines scheduled. Add your first routine!
					</p>
				) : (
					<div className='space-y-1 relative'>
						{activeRoutines.map((routine, index) => (
							<div
								key={routine.id}
								onClick={() => isToday && onToggle(routine.id)}
								className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
									isToday
										? 'cursor-pointer'
										: 'cursor-default'
								} ${
									dailyChecks[routine.id] && isToday
										? 'bg-emerald-500/20 border-2 border-emerald-500'
										: 'bg-teal-600/30 backdrop-blur-sm border-2 border-teal-700/40 hover:bg-teal-600/40'
								}`}>
								<div className='bg-teal-700/60 backdrop-blur-sm px-4 py-2 rounded-lg min-w-24 text-center'>
									<span className='text-white font-medium'>
										{routine.timeOfDay}
									</span>
								</div>

								<div className='flex-1 flex items-center gap-3'>
									{isToday && (
										<div
											className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
												dailyChecks[routine.id]
													? 'bg-emerald-500 border-emerald-500'
													: 'border-white/70 bg-white/20'
											}`}>
											{dailyChecks[routine.id] && (
												<Check
													size={14}
													className='text-white'
												/>
											)}
										</div>
									)}

									<div className='bg-teal-600/40 backdrop-blur-sm px-4 py-2 rounded-lg flex-1'>
										<span
											className={`text-white font-medium ${
												dailyChecks[routine.id] &&
												isToday
													? 'line-through opacity-70'
													: ''
											}`}>
											{routine.title}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{isToday && activeRoutines.length > 0 && (
				<div className='bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white text-center'>
					<p className='text-lg font-medium'>
						{Object.values(dailyChecks).filter((v) => v).length} /{' '}
						{activeRoutines.length} completed today
					</p>
				</div>
			)}
		</div>
	);
};

const RoutinesPage = ({
	routines,
	onAdd,
	onEdit,
	onDelete,
	onToggleActive,
}) => {
	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-bold text-gray-800'>
					My Routines
				</h2>
				<button
					onClick={onAdd}
					className='flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors'>
					<Plus size={20} />
					Add Routine
				</button>
			</div>

			<div className='space-y-4'>
				{routines.length === 0 ? (
					<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center'>
						<p className='text-gray-500'>
							No routines yet. Create your first one!
						</p>
					</div>
				) : (
					routines.map((routine) => (
						<div
							key={routine.id}
							className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6'>
							<div className='flex items-start justify-between'>
								<div className='flex-1'>
									<h3 className='text-lg font-semibold text-gray-800'>
										{routine.title}
									</h3>
									<p className='text-sm text-gray-600 mt-1'>
										Time: {routine.timeOfDay}
									</p>
									<p className='text-sm text-gray-600'>
										Repeat: {routine.repeat.join(', ')}
									</p>
								</div>
								<div className='flex items-center gap-2'>
									<button
										onClick={() =>
											onToggleActive(routine.id)
										}
										className={`px-3 py-1 rounded-lg text-sm font-medium ${
											routine.isActive
												? 'bg-green-100 text-green-700'
												: 'bg-gray-100 text-gray-700'
										}`}>
										{routine.isActive
											? 'Active'
											: 'Inactive'}
									</button>
									<button
										onClick={() => onEdit(routine)}
										className='p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg'>
										<Edit2 size={18} />
									</button>
									<button
										onClick={() => onDelete(routine.id)}
										className='p-2 text-red-600 hover:bg-red-50 rounded-lg'>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

const RoutineModal = ({ routine, onSave, onClose }) => {
	const [title, setTitle] = useState(routine?.title || '');
	const [timeOfDay, setTimeOfDay] = useState(routine?.timeOfDay || '08:00');
	const [repeat, setRepeat] = useState(
		routine?.repeat || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	);
	const [isActive] = useState(routine?.isActive ?? true);

	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const handleSubmit = () => {
		if (!title) return;
		onSave({
			...routine,
			title,
			timeOfDay,
			repeat,
			isActive,
		});
	};

	const toggleDay = (day) => {
		if (repeat.includes(day)) {
			setRepeat(repeat.filter((d) => d !== day));
		} else {
			setRepeat([...repeat, day]);
		}
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
			<div className='bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md'>
				<h3 className='text-2xl font-bold text-gray-800 mb-6'>
					{routine ? 'Edit Routine' : 'Add New Routine'}
				</h3>
				<div className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Routine Name
						</label>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
							placeholder='e.g., Morning Exercise'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Time
						</label>
						<input
							type='time'
							value={timeOfDay}
							onChange={(e) => setTimeOfDay(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Repeat on
						</label>
						<div className='flex flex-wrap gap-2'>
							{days.map((day) => (
								<button
									key={day}
									type='button'
									onClick={() => toggleDay(day)}
									className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
										repeat.includes(day)
											? 'bg-emerald-600 text-white'
											: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
									}`}>
									{day}
								</button>
							))}
						</div>
					</div>

					<div className='flex gap-3 mt-6'>
						<button
							onClick={onClose}
							className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
							Cancel
						</button>
						<button
							onClick={handleSubmit}
							className='flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HabitTrackerApp;
