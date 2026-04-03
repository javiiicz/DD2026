const app = document.getElementById('app');
            function Header(props) {
                return <h1 className={props.class}>{props.title}</h1>
            }
            
            function Homepage() {
                return( 
                <>
                    <Header title="Welcome Miami"/>
                    <Header title="Another Header"/>
                    <p>This is the Homepage</p>
                </>
                )
            }

            const root = ReactDOM.createRoot(app);
            root.render(<Homepage/>);