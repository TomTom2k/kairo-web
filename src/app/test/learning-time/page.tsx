'use client';

import React, { useState } from 'react';
import {
	Calendar,
	BookOpen,
	Target,
	CheckCircle,
	AlertCircle,
	Code,
	List,
	Grid,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';

export default function LearningTimeline() {
	const [startDate, setStartDate] = useState('2025-01-01');
	const [jsonInput, setJsonInput] = useState('');
	const [roadmap, setRoadmap] = useState([
		{
			day: 1,
			topic: 'Introduction & Time Complexity',
			goal: 'Hiểu Big-O, Big-Theta, Big-Omega và phân tích thời gian/không gian.',
			tasks: [
				'Học lý thuyết Time Complexity (O(1), O(n), O(n log n), O(n^2))',
				'Phân tích độ phức tạp của một số thuật toán đơn giản',
				'Làm 2 bài về Big-O',
			],
			resources: [
				'https://www.geeksforgeeks.org/analysis-of-algorithms-big-o-notation/',
				'https://www.youtube.com/watch?v=D6xkbGLQesk',
			],
		},
		{
			day: 2,
			topic: 'Array Basics',
			goal: 'Nắm thao tác cơ bản với mảng và tư duy hai con trỏ.',
			tasks: [
				'Ôn lại thao tác array, two-pointer',
				'Làm 3 bài Easy về Arrays',
			],
			resources: [
				'https://leetcode.com/explore/learn/card/fun-with-arrays/',
				'https://www.youtube.com/watch?v=KlIqIaLRwLU',
			],
		},
	]);
	const [selectedDay, setSelectedDay] = useState(null);
	const [showJsonInput, setShowJsonInput] = useState(false);
	const [jsonError, setJsonError] = useState('');
	const [completedDays, setCompletedDays] = useState({});
	const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'calendar'
	const [currentMonth, setCurrentMonth] = useState(new Date(startDate));

	const calculateDate = (dayNumber) => {
		const start = new Date(startDate);
		const result = new Date(start);
		result.setDate(start.getDate() + dayNumber - 1);
		return result;
	};

	const formatDate = (date) => {
		return date.toLocaleDateString('vi-VN', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	};

	const handleJsonSubmit = () => {
		try {
			const parsed = JSON.parse(jsonInput);
			if (Array.isArray(parsed)) {
				setRoadmap(parsed);
				setJsonError('');
				setShowJsonInput(false);
				setJsonInput('');
			} else {
				setJsonError('Dữ liệu phải là một mảng JSON');
			}
		} catch (e) {
			setJsonError('JSON không hợp lệ: ' + e.message);
		}
	};

	const toggleDayCompletion = (day) => {
		setCompletedDays((prev) => ({
			...prev,
			[day]: !prev[day],
		}));
	};

	const getProgressPercentage = () => {
		const completed = Object.values(completedDays).filter(Boolean).length;
		return Math.round((completed / roadmap.length) * 100);
	};

	// Calendar view helpers
	const getCalendarDays = () => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];

		// Empty cells before first day
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}

		// Actual days
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(new Date(year, month, i));
		}

		return days;
	};

	const getLessonForDate = (date) => {
		if (!date) return null;
		return roadmap.find((item) => {
			const lessonDate = calculateDate(item.day);
			return lessonDate.toDateString() === date.toDateString();
		});
	};

	const changeMonth = (direction) => {
		setCurrentMonth((prev) => {
			const newDate = new Date(prev);
			newDate.setMonth(prev.getMonth() + direction);
			return newDate;
		});
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='bg-white rounded-2xl shadow-lg p-6 mb-6'>
					<div className='flex items-center justify-between mb-4'>
						<div className='flex items-center gap-3'>
							<BookOpen className='w-8 h-8 text-indigo-600' />
							<h1 className='text-3xl font-bold text-gray-800'>
								Lộ Trình Học Tập
							</h1>
						</div>
						<div className='flex gap-3'>
							{/* View Mode Buttons */}
							<div className='flex bg-gray-100 rounded-lg p-1'>
								<button
									onClick={() => setViewMode('grid')}
									className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${
										viewMode === 'grid'
											? 'bg-white shadow-sm text-indigo-600'
											: 'text-gray-600'
									}`}>
									<Grid className='w-4 h-4' />
									Grid
								</button>
								<button
									onClick={() => setViewMode('list')}
									className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${
										viewMode === 'list'
											? 'bg-white shadow-sm text-indigo-600'
											: 'text-gray-600'
									}`}>
									<List className='w-4 h-4' />
									List
								</button>
								<button
									onClick={() => setViewMode('calendar')}
									className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${
										viewMode === 'calendar'
											? 'bg-white shadow-sm text-indigo-600'
											: 'text-gray-600'
									}`}>
									<Calendar className='w-4 h-4' />
									Calendar
								</button>
							</div>
							<button
								onClick={() => setShowJsonInput(!showJsonInput)}
								className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2'>
								<Code className='w-4 h-4' />
								Nhập JSON
							</button>
						</div>
					</div>

					{/* Start Date Input */}
					<div className='flex items-center gap-4 mb-4'>
						<label className='flex items-center gap-2 text-gray-700 font-medium'>
							<Calendar className='w-5 h-5 text-indigo-600' />
							Ngày bắt đầu:
						</label>
						<input
							type='date'
							value={startDate}
							onChange={(e) => {
								setStartDate(e.target.value);
								setCurrentMonth(new Date(e.target.value));
							}}
							className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none'
						/>
					</div>

					{/* Progress Bar */}
					<div className='mt-4'>
						<div className='flex justify-between text-sm text-gray-600 mb-2'>
							<span>Tiến độ hoàn thành</span>
							<span className='font-semibold'>
								{getProgressPercentage()}%
							</span>
						</div>
						<div className='w-full bg-gray-200 rounded-full h-3'>
							<div
								className='bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500'
								style={{ width: `${getProgressPercentage()}%` }}
							/>
						</div>
					</div>
				</div>

				{/* JSON Input Modal */}
				{showJsonInput && (
					<div className='bg-white rounded-2xl shadow-lg p-6 mb-6'>
						<h2 className='text-xl font-bold text-gray-800 mb-4'>
							Nhập Dữ Liệu JSON
						</h2>
						<textarea
							value={jsonInput}
							onChange={(e) => setJsonInput(e.target.value)}
							placeholder='[{"day": 1, "topic": "...", "goal": "...", "tasks": [...], "resources": [...]}]'
							className='w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-indigo-500 focus:outline-none'
						/>
						{jsonError && (
							<div className='mt-2 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2'>
								<AlertCircle className='w-5 h-5' />
								{jsonError}
							</div>
						)}
						<div className='flex gap-3 mt-4'>
							<button
								onClick={handleJsonSubmit}
								className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'>
								Áp Dụng
							</button>
							<button
								onClick={() => {
									setShowJsonInput(false);
									setJsonError('');
									setJsonInput('');
								}}
								className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition'>
								Hủy
							</button>
						</div>
					</div>
				)}

				{/* Grid View */}
				{viewMode === 'grid' && (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{roadmap.map((item) => (
							<div
								key={item.day}
								className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-2 ${
									completedDays[item.day]
										? 'border-green-500'
										: 'border-transparent'
								}`}
								onClick={() => setSelectedDay(item)}>
								<div className='p-5'>
									<div className='flex items-center justify-between mb-3'>
										<div className='flex items-center gap-2'>
											<div className='w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center'>
												<span className='text-indigo-600 font-bold'>
													{item.day}
												</span>
											</div>
											<div>
												<div className='text-xs text-gray-500'>
													Ngày
												</div>
												<div className='text-xs font-semibold text-gray-700'>
													{formatDate(
														calculateDate(item.day)
													)}
												</div>
											</div>
										</div>
										<button
											onClick={(e) => {
												e.stopPropagation();
												toggleDayCompletion(item.day);
											}}
											className='transition-transform hover:scale-110'>
											{completedDays[item.day] ? (
												<CheckCircle className='w-6 h-6 text-green-500 fill-green-500' />
											) : (
												<CheckCircle className='w-6 h-6 text-gray-300' />
											)}
										</button>
									</div>
									<h3 className='font-bold text-gray-800 mb-2 line-clamp-2'>
										{item.topic}
									</h3>
									<p className='text-sm text-gray-600 line-clamp-2'>
										{item.goal}
									</p>
									<div className='mt-3 pt-3 border-t border-gray-200'>
										<div className='text-xs text-gray-500'>
											{item.tasks.length} nhiệm vụ •{' '}
											{item.resources.length} tài nguyên
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* List View */}
				{viewMode === 'list' && (
					<div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
						<div className='overflow-x-auto'>
							<table className='w-full'>
								<thead className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white'>
									<tr>
										<th className='px-6 py-4 text-left font-semibold'>
											Ngày
										</th>
										<th className='px-6 py-4 text-left font-semibold'>
											Ngày học
										</th>
										<th className='px-6 py-4 text-left font-semibold'>
											Chủ đề
										</th>
										<th className='px-6 py-4 text-left font-semibold'>
											Mục tiêu
										</th>
										<th className='px-6 py-4 text-center font-semibold'>
											Nhiệm vụ
										</th>
										<th className='px-6 py-4 text-center font-semibold'>
											Trạng thái
										</th>
									</tr>
								</thead>
								<tbody>
									{roadmap.map((item, index) => (
										<tr
											key={item.day}
											className={`border-b border-gray-200 hover:bg-indigo-50 cursor-pointer transition ${
												index % 2 === 0
													? 'bg-white'
													: 'bg-gray-50'
											}`}
											onClick={() =>
												setSelectedDay(item)
											}>
											<td className='px-6 py-4'>
												<div className='w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center'>
													<span className='text-indigo-600 font-bold'>
														{item.day}
													</span>
												</div>
											</td>
											<td className='px-6 py-4 text-sm text-gray-700 font-medium'>
												{formatDate(
													calculateDate(item.day)
												)}
											</td>
											<td className='px-6 py-4'>
												<div className='font-semibold text-gray-800'>
													{item.topic}
												</div>
											</td>
											<td className='px-6 py-4 text-sm text-gray-600 max-w-md'>
												<div className='line-clamp-2'>
													{item.goal}
												</div>
											</td>
											<td className='px-6 py-4 text-center'>
												<span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
													{item.tasks.length}
												</span>
											</td>
											<td className='px-6 py-4 text-center'>
												<button
													onClick={(e) => {
														e.stopPropagation();
														toggleDayCompletion(
															item.day
														);
													}}
													className='transition-transform hover:scale-110'>
													{completedDays[item.day] ? (
														<CheckCircle className='w-6 h-6 text-green-500 fill-green-500 mx-auto' />
													) : (
														<CheckCircle className='w-6 h-6 text-gray-300 mx-auto' />
													)}
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{/* Calendar View */}
				{viewMode === 'calendar' && (
					<div className='bg-white rounded-2xl shadow-lg p-6'>
						{/* Calendar Header */}
						<div className='flex items-center justify-between mb-6'>
							<h2 className='text-2xl font-bold text-gray-800'>
								{currentMonth.toLocaleDateString('vi-VN', {
									month: 'long',
									year: 'numeric',
								})}
							</h2>
							<div className='flex gap-2'>
								<button
									onClick={() => changeMonth(-1)}
									className='p-2 hover:bg-gray-100 rounded-lg transition'>
									<ChevronLeft className='w-5 h-5' />
								</button>
								<button
									onClick={() => changeMonth(1)}
									className='p-2 hover:bg-gray-100 rounded-lg transition'>
									<ChevronRight className='w-5 h-5' />
								</button>
							</div>
						</div>

						{/* Calendar Grid */}
						<div className='grid grid-cols-7 gap-2'>
							{/* Day headers */}
							{['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(
								(day) => (
									<div
										key={day}
										className='text-center font-semibold text-gray-600 py-2'>
										{day}
									</div>
								)
							)}

							{/* Calendar days */}
							{getCalendarDays().map((date, index) => {
								const lesson = getLessonForDate(date);
								const isToday =
									date &&
									date.toDateString() ===
										new Date().toDateString();

								return (
									<div
										key={index}
										className={`min-h-24 p-2 border rounded-lg transition ${
											!date
												? 'bg-gray-50'
												: lesson
												? 'bg-indigo-50 hover:bg-indigo-100 cursor-pointer'
												: 'bg-white hover:bg-gray-50'
										} ${
											isToday
												? 'ring-2 ring-indigo-500'
												: ''
										} ${
											lesson && completedDays[lesson.day]
												? 'border-green-500 border-2'
												: ''
										}`}
										onClick={() =>
											lesson && setSelectedDay(lesson)
										}>
										{date && (
											<>
												<div className='flex items-center justify-between mb-1'>
													<span
														className={`text-sm font-semibold ${
															isToday
																? 'text-indigo-600'
																: 'text-gray-700'
														}`}>
														{date.getDate()}
													</span>
													{lesson &&
														completedDays[
															lesson.day
														] && (
															<CheckCircle className='w-4 h-4 text-green-500 fill-green-500' />
														)}
												</div>
												{lesson && (
													<>
														<div className='text-xs font-semibold text-indigo-600 mb-1'>
															Ngày {lesson.day}
														</div>
														<div className='text-xs text-gray-700 line-clamp-2'>
															{lesson.topic}
														</div>
													</>
												)}
											</>
										)}
									</div>
								);
							})}
						</div>

						{/* Legend */}
						<div className='flex gap-6 mt-6 pt-6 border-t border-gray-200'>
							<div className='flex items-center gap-2'>
								<div className='w-4 h-4 bg-indigo-50 border border-gray-300 rounded'></div>
								<span className='text-sm text-gray-600'>
									Có bài học
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<div className='w-4 h-4 bg-white border-2 border-green-500 rounded'></div>
								<span className='text-sm text-gray-600'>
									Đã hoàn thành
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<div className='w-4 h-4 bg-white ring-2 ring-indigo-500 rounded'></div>
								<span className='text-sm text-gray-600'>
									Hôm nay
								</span>
							</div>
						</div>
					</div>
				)}

				{/* Detail Modal */}
				{selectedDay && (
					<div
						className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50'
						onClick={() => setSelectedDay(null)}>
						<div
							className='bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto'
							onClick={(e) => e.stopPropagation()}>
							<div className='sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl'>
								<div className='flex items-center justify-between'>
									<div>
										<div className='text-sm opacity-90'>
											Ngày {selectedDay.day} •{' '}
											{formatDate(
												calculateDate(selectedDay.day)
											)}
										</div>
										<h2 className='text-2xl font-bold mt-1'>
											{selectedDay.topic}
										</h2>
									</div>
									<button
										onClick={() => setSelectedDay(null)}
										className='w-8 h-8 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition flex items-center justify-center text-xl'>
										×
									</button>
								</div>
							</div>

							<div className='p-6'>
								{/* Goal */}
								<div className='mb-6'>
									<div className='flex items-center gap-2 mb-3'>
										<Target className='w-5 h-5 text-indigo-600' />
										<h3 className='text-lg font-bold text-gray-800'>
											Mục Tiêu
										</h3>
									</div>
									<p className='text-gray-700 bg-indigo-50 p-4 rounded-lg'>
										{selectedDay.goal}
									</p>
								</div>

								{/* Tasks */}
								<div className='mb-6'>
									<div className='flex items-center gap-2 mb-3'>
										<CheckCircle className='w-5 h-5 text-green-600' />
										<h3 className='text-lg font-bold text-gray-800'>
											Nhiệm Vụ
										</h3>
									</div>
									<ul className='space-y-2'>
										{selectedDay.tasks.map((task, idx) => (
											<li
												key={idx}
												className='flex items-start gap-3 bg-gray-50 p-3 rounded-lg'>
												<span className='flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold'>
													{idx + 1}
												</span>
												<span className='text-gray-700'>
													{task}
												</span>
											</li>
										))}
									</ul>
								</div>

								{/* Resources */}
								<div>
									<div className='flex items-center gap-2 mb-3'>
										<BookOpen className='w-5 h-5 text-purple-600' />
										<h3 className='text-lg font-bold text-gray-800'>
											Tài Nguyên
										</h3>
									</div>
									<ul className='space-y-2'>
										{selectedDay.resources.map(
											(resource, idx) => (
												<li key={idx}>
													<a
														href={resource}
														target='_blank'
														rel='noopener noreferrer'
														className='flex items-center gap-2 bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition text-purple-700 hover:text-purple-900'>
														<span className='flex-shrink-0'>
															🔗
														</span>
														<span className='truncate'>
															{resource}
														</span>
													</a>
												</li>
											)
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
