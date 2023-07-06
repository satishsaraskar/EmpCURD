using FullStaskApi.Data;
using FullStaskApi.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace FullStaskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly FullStackDbContext _fullStackDbContext1;

        public EmployeesController(FullStackDbContext fullStackDbContext1)
        {
            _fullStackDbContext1 = fullStackDbContext1;
        }

        [HttpGet]
        public async Task<IActionResult> GatAllEmployees()
        {
            var employees = await _fullStackDbContext1.Employees.ToListAsync();

           return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmpoloyee([FromBody]Employee employeeRequest)
        {
            employeeRequest.Id = Guid.NewGuid();
            
            await _fullStackDbContext1.Employees.AddAsync(employeeRequest);
            await _fullStackDbContext1.SaveChangesAsync();

            return Ok(employeeRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult>GetEmpoloyeeById([FromRoute] Guid id)
        {
          var employee = await _fullStackDbContext1.Employees.FirstOrDefaultAsync(x => x.Id == id);
           
            if(employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id ,Employee updateEmployeeRequest )
        {
            var employee =  await _fullStackDbContext1.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound();
            }
            employee.Name = updateEmployeeRequest.Name;
            employee.Email = updateEmployeeRequest.Email;
            employee.Phone = updateEmployeeRequest.Phone;
            employee.Salary = updateEmployeeRequest.Salary;
            employee.Department = updateEmployeeRequest.Department;


            await _fullStackDbContext1.SaveChangesAsync();
            return Ok(employee);
        }

        //single emp 
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id ) 
        {
            var employee = await _fullStackDbContext1.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
             _fullStackDbContext1.Employees.Remove(employee);
            await _fullStackDbContext1.SaveChangesAsync();

            return Ok(employee);
        }

    }
}
