import '../../styles/layout/Filters.scss';
import FilterByName from './FilterByName';
import FilterBySpecie from './FilterBySpecie';
import FilterByStatus from './FilterByStatus';

function Form({filterName, filterByName, filterSpecie, filterBySpecie, filterStatus, filterByStatus}) {
    const handleSubmit = (ev) => {
        ev.preventDefault();
    }
    
    return (
        <form className='form' onSubmit={handleSubmit}>
            <FilterByName filterName={filterName} filterByName={filterByName}/>
            <FilterBySpecie filterSpecie={filterSpecie} filterBySpecie={filterBySpecie}/>
            <FilterByStatus filterStatus={filterStatus} filterByStatus={filterByStatus}/>
        </form>
    )
}

export default Form;