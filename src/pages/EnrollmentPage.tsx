import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments } from "@/lib/mock-data";

export default function Enrollent() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex justify-between">
          <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          </div>
          <div>
          <RegisterDialog />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find(
            (item) =>
              item.studentId === currentStudent.studentId &&
              item.courseId === course.courseId,
          );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              enrolledAt={enrollment?.enrolledAt}
            />
          );
        })}
      </div>
    </div>
  );
}
