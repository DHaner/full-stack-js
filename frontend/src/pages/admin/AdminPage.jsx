import Form from "../../components/Fomr";
import PatientList from "../../components/PatientList";
import { Container } from "../../components/ui/Container";

export default function AdminPage() {
    return (
        <div className="flex flex-col mt-12 mx-4 gap-8 md:flex-row items-center justify-center max-w-6xl md:mx-auto">
            <Container className="md:w-2/5">
                <Form />
            </Container>

            <Container className="md:w-3/5">
                <PatientList />
            </Container>
        </div>
    )
}