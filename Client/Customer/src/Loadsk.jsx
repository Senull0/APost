import load from './assets/load.svg'

const Loadsk = () => {
    return (
        <div>
            <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '98vh'}}>
            <img src = {load}
            style = {{width: '50px', height: 'auto'}}
            alt = 'loading...'
            />
            </div>
        </div>
    )
}


export default Loadsk;