using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StarterKit.Migrations
{
    /// <inheritdoc />
    public partial class EventsV1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Event_Attendance_User_UserId",
                table: "Event_Attendance");

            migrationBuilder.DropIndex(
                name: "IX_Event_Attendance_UserId",
                table: "Event_Attendance");

            migrationBuilder.InsertData(
                table: "Event",
                columns: new[] { "EventId", "AdminApproval", "Description", "EndTime", "EventDate", "Location", "StartTime", "Title" },
                values: new object[,]
                {
                    { 1, true, "First day", new TimeSpan(0, 15, 0, 0, 0), new DateOnly(2024, 9, 2), "Hogeschool Rotterdam", new TimeSpan(0, 10, 30, 0, 0), "Opening" },
                    { 2, true, "Last day", new TimeSpan(0, 12, 0, 0, 0), new DateOnly(2025, 6, 30), "Hogeschool Rotterdam", new TimeSpan(0, 11, 0, 0, 0), "Final" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "UserId", "Email", "FirstName", "LastName", "Password", "RecuringDays" },
                values: new object[,]
                {
                    { 1, "max@example.com", "Max", "Bretherton", "+�\rS{���a��V�����qb���_�{�'�[", "mo,tu,we" },
                    { 2, "max@example.com", "Amer", "Alhasoun", "+�\rS{���a��V�����qb���_�{�'�[", "we,th,fr" },
                    { 3, "max@example.com", "Aymane", "Aazouz", "+�\rS{���a��V�����qb���_�{�'�[", "mo,we,fr" },
                    { 4, "max@example.com", "Jordy", "Mahn", "+�\rS{���a��V�����qb���_�{�'�[", "tu,we,th" }
                });

            migrationBuilder.InsertData(
                table: "Event_Attendance",
                columns: new[] { "Event_AttendanceId", "EventId", "Feedback", "Rating", "UserId" },
                values: new object[,]
                {
                    { 1, 1, "It was excellent", 5, 1 },
                    { 2, 2, "It was bad", 2, 1 },
                    { 3, 1, "It was good", 4, 2 },
                    { 4, 1, "It was awful", 1, 3 },
                    { 5, 2, "It was okay", 3, 3 },
                    { 6, 2, "It was decent", 3, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_UserId",
                table: "User",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Event_Attendance_Event_AttendanceId",
                table: "Event_Attendance",
                column: "Event_AttendanceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Event_EventId",
                table: "Event",
                column: "EventId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_UserId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_Event_Attendance_Event_AttendanceId",
                table: "Event_Attendance");

            migrationBuilder.DropIndex(
                name: "IX_Event_EventId",
                table: "Event");

            migrationBuilder.DeleteData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Event",
                keyColumn: "EventId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Event",
                keyColumn: "EventId",
                keyValue: 2);

            migrationBuilder.CreateIndex(
                name: "IX_Event_Attendance_UserId",
                table: "Event_Attendance",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Attendance_User_UserId",
                table: "Event_Attendance",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
