import { useContext } from 'react';
import { Form, Formik } from 'formik';
import { CommissionConfigContext } from '../../context/CommissionConfigContext';
import { Dropdown } from '../../components/ui/Dropdown/Dropdown';
import { CommissionConfigBranchFormData } from '../../interfaces/CommissionInterface';

const initialFormBranchData: CommissionConfigBranchFormData = {
	id_branch_company: 0,
	branch: '',
};

export const CommissionsConfigBranchForm = () => {
	const {
		branches,
		setSelectedBranch,
	} = useContext( CommissionConfigContext );

	const onSelectedItem = (item: string) => {
		const branch = branches.find( branch => branch.branch === item );

		if( branch ) {
			setSelectedBranch( branch );
		}
	}

  return (
    <Formik
			initialValues={ initialFormBranchData }
			onSubmit={ () => { } }
			enableReinitialize={ true }
		>
			{( { errors, touched } ) => (
				<Form>
					<div className="row">
						<div className="col-xl-2 col-4 mt-xl-3 mb-xl-2">
							<div className={`input-group`}>
								<Dropdown
									data={ branches.map( branch => branch.branch ) }
									name="branch"
									position='down'
									onSelectedItem={ (item) => onSelectedItem(item) }
								/>
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
  )
}