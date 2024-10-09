using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StarterKit.Migrations
{
    /// <inheritdoc />
    public partial class AttendanceV1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Attendance_UserId",
                table: "Attendance");

            migrationBuilder.DropColumn(
                name: "AttendanceDate",
                table: "Attendance");

            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "Event",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeArrived",
                table: "Attendance",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Attendance",
                columns: new[] { "AttendanceId", "TimeArrived", "UserId" },
                values: new object[,]
                {
                    { 1, null, 1 },
                    { 2, null, 2 },
                    { 3, null, 3 },
                    { 4, null, 4 }
                });

            migrationBuilder.UpdateData(
                table: "Event",
                keyColumn: "EventId",
                keyValue: 1,
                column: "Capacity",
                value: 100);

            migrationBuilder.UpdateData(
                table: "Event",
                keyColumn: "EventId",
                keyValue: 2,
                column: "Capacity",
                value: 120);

            migrationBuilder.CreateIndex(
                name: "IX_Attendance_AttendanceId",
                table: "Attendance",
                column: "AttendanceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attendance_UserId",
                table: "Attendance",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Attendance_AttendanceId",
                table: "Attendance");

            migrationBuilder.DropIndex(
                name: "IX_Attendance_UserId",
                table: "Attendance");

            migrationBuilder.DeleteData(
                table: "Attendance",
                keyColumn: "AttendanceId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Attendance",
                keyColumn: "AttendanceId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Attendance",
                keyColumn: "AttendanceId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Attendance",
                keyColumn: "AttendanceId",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "Event");

            migrationBuilder.DropColumn(
                name: "TimeArrived",
                table: "Attendance");

            migrationBuilder.AddColumn<DateTime>(
                name: "AttendanceDate",
                table: "Attendance",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Attendance_UserId",
                table: "Attendance",
                column: "UserId");
        }
    }
}
