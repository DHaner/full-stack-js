import Form from "../../components/Form";
import PatientList from "../../components/PatientList";
import { Container } from "../../components/ui/Container";

export default function AdminPage() {
    return (
        <div className="flex flex-col mt-12 mx-4 gap-8 md:flex-row justify-center max-w-6xl md:mx-auto md:max-h-[700px]">
            <Container className="md:w-2/5">
                <Form />
            </Container>

            <Container className="md:w-3/5 ">
                <PatientList />
            </Container>
        </div>
    )
}