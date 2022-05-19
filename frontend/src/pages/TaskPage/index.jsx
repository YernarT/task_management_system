import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store';

import { useSetState, useRequest, useMemoizedFn } from 'ahooks';
import {
	reqGetAllSubmission,
	reqMarkDoneSubmission,
} from '@/services/api/user-api';
import { useAuth } from '@/hooks';

import {
	message as antdMessage,
	Button,
	Avatar,
	Typography,
	Space,
	Empty,
	Card,
	Descriptions,
} from 'antd';
import { AddSubmissionModal } from '@/components';
import { TaskPageStyled, SubmissionList } from './style';

const { Title, Paragraph, Text } = Typography;

export default function TaskPage() {
	const [user, setUser] = useRecoilState(userAtom);
	const history = useHistory();

	// 授权校验
	useAuth(user.token);

	const [state, setState] = useSetState({
		task: history.location.state.task,
		submissions: [],

		addSubmissionModalVisible: false,
	});

	// YYYY-MM-DD hh:mm:ss
	const formatDate = useMemoizedFn(dateString => {
		let date = new Date(dateString);
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDay();
		let hour = date.getHours();
		let minute = date.getMinutes();

		return `${year}-${month}-${day} ${hour}:${minute}`;
	});

	console.log(state.task);

	// 获取所有 Submission
	// useRequest(() => reqGetAllSubmission(state.task.id), {
	// 	onSuccess(submissions) {
	// 		setState({ submissions });
	// 	},
	// });

	// MarkDone 请求
	// const { runAsync, loading } = useRequest(
	// 	data => reqMarkDoneSubmission(data),
	// 	{
	// 		manual: true,
	// 	},
	// );

	// 处理 mark done
	// const handleMarkDone = submission => {
	// 	runAsync({ status_id: submission.id }).then(() => {
	// 		setState(prevState => ({
	// 			submissions: prevState.submissions.filter(
	// 				_submission => _submission.id !== submission.id,
	// 			),
	// 		}));
	// 	});
	// };

	return (
		<>
			<TaskPageStyled>
				<Title level={2} className="title">
					{state.task.name}
				</Title>

				<Card className="task-data">
					<Space className="header">
						<Space direction="vertical" size="small">
							<Text>Бастау уақыт: {formatDate(state.task.start_time)}</Text>
							<Text>Аяқтау уақыт: {formatDate(state.task.start_time)}</Text>
						</Space>

						<Text>Қаржы {state.task.funds} ₸</Text>
					</Space>

					<Descriptions title="Тапсырма сипаттамасы">
						<Descriptions.Item>
							{state.task.description || 'Сипаттама жоқ'}
						</Descriptions.Item>
					</Descriptions>

					{state.task.creator !== user.id && (
						<Button
							block
							type="primary"
							style={{ marginTop: '15px' }}
							onClick={() => setState({ addSubmissionModalVisible: true })}>
							Тапсырманы жіберу
						</Button>
					)}
				</Card>

				{state.task.creator === user.id && (
					<Card>
						<SubmissionList>
							{state.submissions
								.filter(submission => !submission.finished)
								.map(submission => (
									<li className="submission-wrap" key={submission.id}>
										<Card>
											<div className="submission">
												<Avatar
													src={submission.user.avatar}
													className="avatar"
												/>
												<Title level={5} className="username">
													{submission.user.username}
												</Title>

												<div className="more">
													<a href={submission.file_path}>File</a>

													<Button
														// loading={loading}
														onClick={() => {
															// handleMarkDone(submission);
														}}>
														Mark done
													</Button>
												</div>
											</div>
										</Card>
									</li>
								))}

							{state.submissions.filter(submission => !submission.finished)
								.length === 0 && (
								<Empty description="Тапсырылған тапсырмалар жоқ" />
							)}
						</SubmissionList>
					</Card>
				)}
			</TaskPageStyled>

			{/* {state.task.creator.id !== user.id && (
				<AddSubmissionModal
					visible={state.addSubmissionModalVisible}
					onCancel={() => setState({ addSubmissionModalVisible: false })}
					task={state.task}
					afterAddSubmission={() => {
						setState({ addSubmissionModalVisible: false });
						antdMessage.success('Uploaded successfully');
						history.goBack();
					}}
				/>
			)} */}
		</>
	);
}
