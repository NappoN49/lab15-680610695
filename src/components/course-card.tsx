import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { enrollments } from "@/lib/mock-data";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
};

export function CourseCard({ course, student, enrolledAt }: CourseCardProps) {
  const enrolledCourse = student.courses?.find(
    (enrollcourseId) => enrollcourseId === course.courseId,
  );

  const reEnrolledAt =
    enrolledAt ??
    enrollments.find(
      (item) =>
        item.studentId === student.studentId && item.courseId === course.courseId,
    )?.enrolledAt;

  const formattedDate = reEnrolledAt
    ? new Date(reEnrolledAt).toLocaleString("th-TH", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  if (enrolledCourse) {
    return (
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle className="text-base">{course.courseTitle}</CardTitle>
            <CardDescription>
              รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
              {course.instructors.join(", ")}
            </CardDescription>
          </div>

          <div>
            <Badge className="bg-amber-50 text-amber-700 dark:bg-purple-950 dark:text-purple-300">
              ลงทะเบียนแล้ว
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex w-full items-end justify-between gap-4">
            <div className="text-xs text-muted-foreground">
              <p>
                ชื่อ นศ.: {student.firstName} {student.lastName}
              </p>
              <p>โปรแกรม: {student.program}</p>
              <p>ลงทะเบียนเมื่อ: {formattedDate}</p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="ยกเลิกการลงทะเบียน"
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle className="text-base">{course.courseTitle}</CardTitle>
            <CardDescription>
              รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
              {course.instructors.join(", ")}
            </CardDescription>
          </div>

          <div>
            <Badge className="bg-purple-50 text-purple-700 dark:bg-amber-950 dark:text-amber-300">
              เปิดรับ
            </Badge>
          </div>
        </CardHeader>
      </Card>
    );
  }
}
