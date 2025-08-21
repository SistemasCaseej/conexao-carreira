"use client"

import {RequirementsInput} from "@/components/RequirementsInput";
import {LocationInput} from "@/components/LocationInput";
import {JobDescription} from "@/components/JobDescription";
import {JobBenefits} from "@/components/JobBenefits";
import {EmploymentType} from "@/components/EmploymentType";
import SalaryRange from "@/components/SalaryRange";
import JobTitleInput from "@/components/JobTitle";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {WorkModel} from "@/components/WorkModel";

export default function PageNewJob(){

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        requirements: [],
        benefits: [],
        description: "",
        employmentType: "",
        workModel: "",
        salaryRange: { minSalary: "", maxSalary: "", notInformed: false },

    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log(formData);
        const response = await fetch("/api/company/job", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        const data = await response.json();

        if(!response.ok) {
            toast.error(data.message || "Erro ao cadastrar vaga.");

        }else {
            toast.success(data.message);
            setFormData({
                title: "",
                location: "",
                requirements: [],
                benefits: [],
                description: "",
                employmentType: "",
                workModel: "",
                salaryRange: { minSalary: "", maxSalary: "", notInformed: false },
            });
        }
    };

    return (
        <section className="h-screen p-10">
            <div className="mb-5">
                <h1 className="text-3xl font-semibold text-[#49257b]">Informações da Vaga</h1>
                <span className="mt-2 text-gray-500 text-sm">  Forneça detalhes claros sobre a vaga para que os candidatos entendam suas responsabilidades e os dados que serão exibidos publicamente</span>
            </div>

            <hr className="-mx-10 mt-5"></hr>

            <section className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <JobTitleInput
                    value={formData.title}
                    onChange={(val) => handleChange("title", val)}
                />
                <LocationInput
                    value={formData.location}
                    onChange={(val) => handleChange("location", val)}
                />
                <SalaryRange
                    value={formData.salaryRange}
                    onChange={(val) => handleChange("salaryRange", val)}
                />
                <JobDescription
                    value={formData.description}
                    onChange={(val) => handleChange("description", val)}
                />
                <EmploymentType
                    value={formData.employmentType}
                    onChange={(val) => handleChange("employmentType", val)}
                />
                <WorkModel
                    value={formData.workModel}
                    onChange={(val) => handleChange("workModel", val)}

                />
                <RequirementsInput
                    value={formData.requirements}
                    onChange={(val) => handleChange("requirements", val)}
                />
                <JobBenefits
                    value={formData.benefits}
                    onChange={(val) => handleChange("benefits", val)}
                />

            </section>

            <Button
                onClick={handleSubmit}
                className="mb-5 mt-5 px-6 py-2 bg-[#49257b] text-white cursor-pointer"
            >

                Publicar vaga
            </Button>

        </section>
    )
}